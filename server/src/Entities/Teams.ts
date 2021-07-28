import { GraphQLString } from "graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookingsEntity } from "./Booking";

// class that typeorm will used to create a database table structure  
@Entity({ name: 'teams' })
export class TeamsEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string

  @Column()
  contactEmail!: string

  @Column()
  contactPhoneNumber!: string

  @OneToMany(() => BookingsEntity, (booking: BookingsEntity) => booking.team, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  bookings!: Array<BookingsEntity>;
}