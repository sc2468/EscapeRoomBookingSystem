import { SpinnerIcon } from '@chakra-ui/icons';
import React from 'react'
import BookingForm from '../../components/BookingForm'
import { useGetBookingQuery } from '../../generated/graphql'

export default function BookRoom() {
  const { data, error, loading } = useGetBookingQuery({ variables: { id: 1 } });
  return (
    <>
      {loading && <SpinnerIcon />}
      {(error || (data && data.getBooking.errors)) && <div>An Error has occurred please refresh the page</div>}
      {(data && data.getBooking && data.getBooking.booking) && <BookingForm booking={data.getBooking.booking} />}
    </>
  )
}
