import { BookingsEntity } from "../entities/Booking";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class BookingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => BookingsEntity, { nullable: true })
  booking?: BookingsEntity;
}

@ObjectType()
export class OperationResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  success?: boolean;

  @Field(() => Boolean, { nullable: true })
  bookingId: number
}

@InputType()
export class BookingInput {
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
export class BookingItemInput {
  @Field()
  date: string;
  @Field()
  time: string;
  @Field()
  roomId: number;
}