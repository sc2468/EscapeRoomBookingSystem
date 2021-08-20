import { bookingStatus } from "../constants";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { BookingsEntity } from "../entities/Booking";
import { TeamsEntity } from "../entities/Teams";
import { BookingResponse, OperationResponse } from "./types";

@InputType()
class BookingInput {
  @Field()
  name: string;
  @Field()
  contactEmail: string;
  @Field()
  contactPhoneNumber: string;
  @Field()
  numberOfPeople: number;
}

@InputType()
class BookingItemInput {
  @Field()
  date: string;
  @Field()
  time: string;
  @Field()
  roomId: number;
}

@Resolver()
export class BookingResolver {
  @Query(() => [BookingsEntity])
  getBookings(
  ): Promise<BookingsEntity[]> {
    return BookingsEntity.find();
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
    return { booking: await BookingsEntity.create({ roomId, date, time, status: bookingStatus.open }).save() }
  }

  @Mutation(() => OperationResponse)
  createAvailableBookings(
    @Arg("bookings", () => [BookingItemInput]) bookings: BookingItemInput[],
  ): OperationResponse {
    try {
      Promise.all(bookings.map(async ({ roomId, date, time }) => {
        BookingsEntity.create({ roomId, date, time, status: bookingStatus.open }).save();
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