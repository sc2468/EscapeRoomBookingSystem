import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { BookingsEntity } from "../../Entities/Booking";
import { BookingType, RoomType } from "../TypeDefs/booking";
import { deleteMessageType } from "../TypeDefs/messages";

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
    numberOfPeople: { type: GraphQLInt }
  },
  async resolve(parents: any, args: any) {
    const { roomId, date, time, teamId, numberOfPeople } = args;

    const createdBooking = BookingsEntity.create({ roomId, date, time, team: teamId, numberOfPeople })
    return await BookingsEntity.save(createdBooking);
  }
};

export const UPDATE_BOOKING = {
  type: BookingType,
  args: {
    id: { type: GraphQLID },
    escapeTime: { type: GraphQLString },
    numberOfPeople: { type: GraphQLInt }
  },
  async resolve(parents: any, args: any) {
    const { id, escapedTime, numberOfPeople } = args;
    const booking = await BookingsEntity.findOne({ id: id })
    const auth = true;
    if (!booking) {
      throw new Error(`Booking with id:${id} does not exist`)
    }
    // ToDo add some sort of auth to only allow admins to edit 
    if (!booking.escapeTime && auth) {
      booking.escapeTime = escapedTime
    } else {
      // this will be returned in the graphql statement
      throw new Error("Provided name or contact number does not match current information for that team id")
    }
    booking.numberOfPeople = numberOfPeople
    return await BookingsEntity.save(booking);
  }
};

export const DELETE_BOOKING = {
  type: deleteMessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents: any, args: any) {
    const { id } = args;
    await BookingsEntity.delete(id)
    return { successful: true, message: `deleted booking with id: ${id}` };
  }
};
