import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt } from 'graphql';

export const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contactEmail: { type: GraphQLString },
    contactPhoneNumber: { type: GraphQLString },
  })
})