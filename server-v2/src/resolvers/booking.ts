import { bookingStatus } from "../constants";
import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BookingsEntity } from "../entities/Booking";
import { TeamsEntity } from "../entities/Teams";

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
  dateAndTime: string;
  @Field()
  roomId: number;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class BookingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => BookingsEntity, { nullable: true })
  booking?: BookingsEntity;
}

@ObjectType()
class OperationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  success?: boolean;
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

  @Mutation(() => BookingsEntity)
  createAvailableBooking(
    @Arg("dateAndTime") dateAndTime: string,
    @Arg("roomId") roomId: number
  ): Promise<BookingsEntity> {
    const createdOpenBooking = BookingsEntity.create({ roomId, dateAndTime, status: bookingStatus.open })
    return BookingsEntity.save(createdOpenBooking);
  }

  @Mutation(() => OperationResponse)
  createAvailableBookings(
    @Arg("bookings", () => [BookingItemInput]) bookings: BookingItemInput[],
  ): OperationResponse {
    try {
      Promise.all(bookings.map(async ({ roomId, dateAndTime }) => {
        const createdBookings = BookingsEntity.create({ roomId, dateAndTime, status: bookingStatus.open });
        await BookingsEntity.save(createdBookings);
      }));
      return ({ success: true });
    } catch (error) {
      return {
        errors: [{
          field: 'booking could not be created',
          message: 'No booking with that id can be found.'
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

      const team = await TeamsEntity.create({ ...options, booking: existingBooking.id });

      const savedTeam = await TeamsEntity.save(team);
      existingBooking.team = savedTeam.id;
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
}