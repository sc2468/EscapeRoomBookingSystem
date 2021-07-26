import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';

export const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    numberOfPeople: { type: GraphQLInt },
    contactEmail: { type: GraphQLString },
    contactPhoneNumber: { type: GraphQLString },
  })
})