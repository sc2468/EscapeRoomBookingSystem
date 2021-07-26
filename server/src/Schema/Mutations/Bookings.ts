import { GraphQLInt, GraphQLString } from "graphql";
import { BookingsEntity } from "../../Entities/Booking";
import { BookingType, RoomType } from "../TypeDefs/booking";

interface teamType {
  name: string;
  contactEmail: string;
  contactPhoneNumber: string
}

interface createArgs {
  roomId: string,
  date: string,
  time: string,
  teamId: number,
}

export const CREATE_BOOKING = {
  type: BookingType,
  args: {
    roomId: { type: RoomType },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    teamId: { type: GraphQLInt },
  },
  async resolve(parents: any, args: any) {
    const { roomId, date, time, teamId } = args;

    const createdBooking = BookingsEntity.create({ roomId, date, time, team: teamId })
    return await BookingsEntity.save(createdBooking);
  }
};
