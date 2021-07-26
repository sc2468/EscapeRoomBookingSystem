import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_TEAMS } from './Queries/Teams';
import { CREATE_TEAM, DELETE_TEAM, UPDATE_TEAM } from './Mutations/Teams';
import { GET_BOOKINGS } from "./Queries/Bookings";
import { CREATE_BOOKING } from "./Mutations/Bookings";
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getAllTeams: GET_ALL_TEAMS,
    getBookings: GET_BOOKINGS
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBooking: CREATE_BOOKING,
    getBookings: GET_BOOKINGS,
    createTeam: CREATE_TEAM,
    updateTeam: UPDATE_TEAM,
    deleteTeam: DELETE_TEAM,
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})