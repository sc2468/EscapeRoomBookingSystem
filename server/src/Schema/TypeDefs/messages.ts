import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const deleteMessageType = new GraphQLObjectType({
  name: "DeleteMessage",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
})