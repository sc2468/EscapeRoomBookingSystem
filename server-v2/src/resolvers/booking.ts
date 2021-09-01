import { bookingStatus } from "../constants";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { BookingsEntity } from "../entities/Booking";
import { TeamsEntity } from "../entities/Teams";
import { BookingInput, BookingItemInput, BookingResponse, OperationResponse } from "./types";
import { getStartOfDateSeconds } from "../utils/getDateString";

@Resolver()
export class BookingResolver {
  @Query(() => [BookingsEntity])
  async getBookings(
    @Arg('limit') limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | undefined
  ): Promise<BookingsEntity[]> {
    const day = 60 * 60 * 24 * 1000;
    const startDate = cursor ? cursor : getStartOfDateSeconds(new Date());
    const limitDate = getStartOfDateSeconds(new Date(parseFloat(startDate) + (day * limit)));
    const allBooking = await BookingsEntity.find({ relations: ['team', 'result'], });

    // need to be changed to use left join
    return allBooking.filter(booking => booking.date >= startDate && booking.date <= limitDate)

    // const queryBuilder = getConnection()
    //   .getRepository(BookingsEntity)
    //   .createQueryBuilder()
    //   .leftJoin(TeamsEntity, "team", "`team`.`id` = `BookingsEntity`.`FK_team_id`")
    //   .where('`date` >= :startDate AND `date` <= :limitDate', { startDate: startDate, limitDate })
    // return queryBuilder.getMany()
  }

  @Query(() => BookingResponse)
  async getBooking(
    @Arg("bookingId") bookingId: number
  ): Promise<BookingResponse> {
    const booking = await BookingsEntity.findOne({ id: bookingId }, { relations: ['team', 'result'], });
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
      return ({ success: true, bookingId: 1 });
    } catch (error) {
      return {
        errors: [{
          field: 'booking could not be created',
          message: 'booking already exists for the time and room'
        }],
        bookingId: 1
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

      const team = await TeamsEntity.create({ ...options, booking: existingBooking }).save();
      existingBooking.team = team;
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
  async CloseOpenBooking(
    @Arg("bookingId") bookingId: number
  ): Promise<OperationResponse> {
    const existingBooking = await BookingsEntity.findOne({ id: bookingId });
    if (existingBooking && existingBooking.status === bookingStatus.open) {
      existingBooking.status = bookingStatus.closed;
      existingBooking
      await BookingsEntity.save(existingBooking)
      return { success: true, bookingId: bookingId };
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: "That booking could not be closed"
        }],
        bookingId: bookingId
      }
    }
  }

  @Mutation(() => OperationResponse)
  async CancelBookedBooking(
    @Arg("bookingId") bookingId: number
  ): Promise<OperationResponse> {
    const existingBooking = await BookingsEntity.findOne({ id: bookingId });
    if (existingBooking && existingBooking.status === bookingStatus.booked) {
      existingBooking.status = bookingStatus.open;
      await BookingsEntity.save(existingBooking)
      return { success: true, bookingId: bookingId };
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: "That booked booking could not be canceled "
        }],
        bookingId: bookingId
      }
    }
  }
}

//SELECT booking.id AS booking_id, booking.time AS booking_time, booking.date AS booking_date, booking.roomId AS booking_roomId, booking.status AS booking_status, booking.FK_team_id AS booking_FK_team_id, booking.FK_result_id AS booking_FK_result_id, team.id AS team_id, team.name AS team_name, team.contactEmail AS team_contactEmail, team.contactPhoneNumber AS team_contactPhoneNumber, team.numberOfPeople AS team_numberOfPeople FROM booking booking LEFT JOIN teams team ON team.id = booking.FK_team_id WHERE date >= ? AND date <= ? 