import { GraphQLList } from 'graphql'
import { BookingsEntity } from '../../Entities/Booking';
import { BookingType } from '../TypeDefs/booking';

export const GET_BOOKINGS = {
  type: new GraphQLList(BookingType),
  // todo create a userInterface for return type eg resolve(): Promise<UserInterface> {
  resolve() {
    return BookingsEntity.find({ relations: ['team'] });
  }
}

