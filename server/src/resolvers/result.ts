import { bookingStatus } from "../constants";
import { BookingsEntity } from "../entities/Booking";
import { ResultEntity } from "../entities/Result";
import { Arg, Mutation, Resolver } from "type-graphql";
import { BookingResponse } from "./types";


@Resolver()
export class ResultResolver {
  @Mutation(() => BookingResponse)
  async CompleteBooking(
    @Arg("bookingId") bookingId: number,
    @Arg("escapeTime") escapeTime: number,
  ): Promise<BookingResponse> {
    const existingBooking = await BookingsEntity.findOne({ id: bookingId }, { relations: ['team'], });
    if (existingBooking && existingBooking.status === bookingStatus.booked) {
      const result = await ResultEntity.create({ escapeTime: escapeTime });
      const savedResult = await ResultEntity.save(result);
      existingBooking.result = savedResult;
      existingBooking.status = bookingStatus.finished;
      const booking = await BookingsEntity.save(existingBooking)
      return { booking };
    } else {
      return {
        errors: [{
          field: 'bookingId',
          message: "That booking either does not exist or in not in a state to be completed"
        }]
      }
    }
  }

  // @Mutation(() => BookingResponse)
  // async CloseOpenBooking(
  //   @Arg("bookingId") bookingId: number,
  // ): Promise<BookingResponse> {
  //   const existingBooking = await BookingsEntity.findOne({ id: bookingId });
  //   if (existingBooking && existingBooking.status === bookingStatus.booked) {
  //     existingBooking.status = bookingStatus.closed;
  //     const booking = await BookingsEntity.save(existingBooking)
  //     return { booking };
  //   } else {
  //     return {
  //       errors: [{
  //         field: 'bookingId',
  //         message: "That booking either does not exist or in not in a open to be completed"
  //       }]
  //     }
  //   }
  // }
}