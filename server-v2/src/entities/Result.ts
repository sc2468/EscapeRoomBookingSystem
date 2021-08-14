import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingsEntity } from "./Booking";

// class that typeorm will used to create a database table structure 
@InputType()
@ObjectType()
@Entity({ name: "results" })
export class ResultEntity extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  escapeTime!: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  notes!: string

  @Field(() => Int)
  @OneToOne(() => BookingsEntity, (booking: BookingsEntity) => booking.team)
  booking!: number;
}