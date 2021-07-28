import { GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { TeamsEntity } from "../../Entities/Teams";
import { deleteMessageType } from "../TypeDefs/messages";
import { TeamType } from "../TypeDefs/team";

export const CREATE_TEAM = {
  type: TeamType,
  args: {
    name: { type: GraphQLString },
    contactEmail: { type: GraphQLString },
    contactPhoneNumber: { type: GraphQLString },
  },
  async resolve(parents: any, args: any) {
    const { name, contactEmail, contactPhoneNumber } = args;
    const createdTeam = TeamsEntity.create({ name, contactEmail, contactPhoneNumber })
    return await TeamsEntity.save(createdTeam);
  }
};

export const DELETE_TEAM = {
  type: deleteMessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parents: any, args: any) {
    const { id } = args;
    await TeamsEntity.delete(id)
    return { successful: true, message: `deleted team with id: ${id}` };
  }
};

export const UPDATE_TEAM = {
  type: TeamType,
  args: {
    id: { type: GraphQLID },
    oldName: { type: GraphQLString },
    oldContactNumber: { type: GraphQLString },
    newName: { type: GraphQLString },
    newContactEmail: { type: GraphQLString },
    newContactNumber: { type: GraphQLString },
    newNumberOfPeople: { type: GraphQLInt }
  },
  async resolve(parents: any, args: any) {
    const { id, oldName, oldContactNumber, newName, newContactEmail, newContactNumber, newNumberOfPeople } = args;
    const team = await TeamsEntity.findOne({ id: id })

    if (!team) {
      throw new Error(`Team with id:${id} does not exist`)
    }

    if (oldName === team?.name && oldContactNumber === team.contactPhoneNumber) {
      team.name = newName
      team.contactEmail = newContactEmail
      team.contactPhoneNumber = newContactNumber
      return await TeamsEntity.save(team);
    } else {
      // this will be returned in the graphql statement
      throw new Error("Provided name or contact number does not match current information for that team id")
    }
  }
};