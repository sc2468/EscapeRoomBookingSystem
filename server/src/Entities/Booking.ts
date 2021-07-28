import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeamsEntity } from "./Teams";

// class that typeorm will used to create a database table structure  
@Entity({ name: "booking" })
export class BookingsEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string

  @Column()
  time!: string

  @Column()
  roomId!: number

  @ManyToOne(() => TeamsEntity, (team: TeamsEntity) => team.id)
  @JoinColumn({ name: "team_id" })
  team!: number

  @Column({ nullable: true })
  escapeTime!: string

  @Column()
  numberOfPeople!: number;
}