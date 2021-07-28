import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLEnumType, GraphQLInt } from 'graphql';
import { TeamType } from './team';
export const RoomType = new GraphQLEnumType({
  name: 'Room',
  values: {
    theSerialKillerDungeon: { value: 0 },
    sinkingShip: { value: 1 },
    theLostSpaceShip: { value: 2 }
  }
});

export const BookingType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    team: { type: TeamType },
    roomId: { type: RoomType },
    numberOfPeople: { type: GraphQLInt }
  })
})