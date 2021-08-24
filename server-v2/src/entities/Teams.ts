import { Field, InputType, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingsEntity } from "./Booking";

// class that typeorm will used to create a database table structure  
@InputType()
@ObjectType()
@Entity({ name: 'teams' })
export class TeamsEntity extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => Int)
  @OneToOne(() => BookingsEntity, (booking: BookingsEntity) => booking.team)
  booking!: BookingsEntity;
}