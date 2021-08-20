import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResultEntity } from "./Result";
import { TeamsEntity } from "./Teams";

// class that typeorm will used to create a database table structure  
@ObjectType()
@Entity({ name: "booking" })
export class BookingsEntity extends BaseEntity {

  @Field(() => Float)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  time!: string

  @Field(() => Float)
  @Column({ type: 'bigint' })
  date!: string

  @Field(() => Int)
  @Column()
  roomId!: number

  @Field(() => Int)
  @Column()
  status!: number;

  @Field(() => TeamsEntity, { nullable: true })
  @OneToOne(() => TeamsEntity, (team: TeamsEntity) => team.id, { eager: true })
  @JoinColumn({ name: "FK_team_id", })
  team!: number | null;

  @Field(() => ResultEntity, { nullable: true })
  @OneToOne(() => ResultEntity, (result: ResultEntity) => result.id, { eager: true })
  @JoinColumn({ name: "FK_result_id", })
  result!: number | null;
}