import { ArgsType, Field, Int } from "type-graphql";
import { Column } from "typeorm";

export const __prod__ = process.env.NODE_ENV === 'production';

export const bookingStatus = {
  open: 1,
  booked: 2,
  closed: 3,
  finished: 4,
}

@ArgsType()
export class teamInfoArgs {
  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  contactEmail!: string;

  @Field()
  @Column()
  contactPhoneNumber!: string;

  @Field(() => Int)
  @Column()
  numberOfPeople!: number;
}