import { GraphQLList } from 'graphql'
import { TeamType } from '../TypeDefs/team'
import { TeamsEntity } from '../../Entities/Teams';

export const GET_ALL_TEAMS = {
  type: new GraphQLList(TeamType),
  // todo create a userInterface for return type eg resolve(): Promise<UserInterface> {
  resolve() {
    return TeamsEntity.find();
  }
}