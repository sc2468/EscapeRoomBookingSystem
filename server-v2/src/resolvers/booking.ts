import { bookingStatus } from "../constants";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BookingsEntity } from "../entities/Booking";
import { TeamsEntity } from "../entities/Teams";
import { BookingInput, BookingItemInput, BookingResponse, OperationResponse } from "./types";
import { getConnection } from "typeorm";
import { getStartOfDateSeconds } from "../utils/getDateString";

@Resolver()
export class BookingResolver {
  @Query(() => [BookingsEntity])
  async getBookings(
    @Arg('limit') limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | undefined
  ): Promise<BookingsEntity[]> {
    const day = 60 * 60 * 24 * 1000;
    const startDate = cursor ? new Date(parseFloat(cursor)) : new Date();
    const limitDate = startDate.getTime() + (day * limit);
    console.log(getStartOfDateSeconds(startDate), limitDate)
    const queryBuilder = getConnection()
      .getRepository(BookingsEntity)
      .createQueryBuilder('p')
      .where('date >= :startDate AND date <= :limitDate', { startDate: startDate.getTime(), limitDate })
    return queryBuilder.getMany()
  }

  @Query(() => BookingResponse)
  async getBooking(
    @Arg("bookingId") bookingId: number
  ): Promise<BookingResponse> {
    const booking = await BookingsEntity.findOne({ id: bookingId });
    if (booking) {
      return {
        booking
      }
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: 'No booking with that id can be found.'
        }]
      }
    }
  }

  @Mutation(() => BookingResponse)
  async createAvailableBooking(
    @Arg("date") date: string,
    @Arg("time") time: string,
    @Arg("roomId") roomId: number
  ): Promise<BookingResponse> {
    const existingBooking = await BookingsEntity.find({ roomId, date, time })
    if (existingBooking.length !== 0) {
      return {
        errors: [{
          message: `A room on the ${date} at ${time} has already been created please refresh you browser`,
          field: 'roomId'
        }]
      }
    }
    return { booking: await BookingsEntity.create({ roomId, date, time, status: bookingStatus.open }).save() }
  }

  @Mutation(() => OperationResponse)
  createAvailableBookings(
    @Arg("bookings", () => [BookingItemInput]) bookings: BookingItemInput[],
  ): OperationResponse {
    try {
      Promise.all(bookings.map(async ({ roomId, date, time }) => {
        BookingsEntity.create({ roomId, date: date, time, status: bookingStatus.open }).save();
      }));
      return ({ success: true });
    } catch (error) {
      return {
        errors: [{
          field: 'booking could not be created',
          message: 'booking already exists for the time and room'
        }]
      }
    }
  }

  @Mutation(() => BookingResponse)
  async BookAvailableBooking(
    @Arg("bookingId") bookingId: number,
    @Arg("options") options: BookingInput
  ): Promise<BookingResponse> {
    const existingBooking = await BookingsEntity.findOne({ id: bookingId });
    if (existingBooking && existingBooking.status === bookingStatus.open && !existingBooking.team) {

      const team = await TeamsEntity.create({ ...options }).save();
      existingBooking.team = team.id;
      existingBooking.status = bookingStatus.booked;
      const booking = await BookingsEntity.save(existingBooking)
      return { booking };
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: "That booking is already booked"
        }]
      }
    }
  }

  @Mutation(() => OperationResponse)
  async CloseBooking(
    @Arg("bookingId") bookingId: number
  ): Promise<OperationResponse> {
    const existingBooking = await BookingsEntity.findOne({ id: bookingId });
    if (existingBooking && existingBooking.status === bookingStatus.open && existingBooking.status === bookingStatus.booked) {
      existingBooking.status = bookingStatus.closed;
      await BookingsEntity.save(existingBooking)
      return { success: true };
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: "That booking could not be closed or canceled"
        }]
      }
    }
  }
}