import { SpinnerIcon } from '@chakra-ui/icons';
import React from 'react'
import DetailsPage from '../../components/DetailsPage';
import { useGetBookingQuery } from '../../generated/graphql';
import { useGetIntId } from '../../untilies/useGetIntId'

export default function BookRoom() {
  const intId = useGetIntId();
  const { data, error, loading } = useGetBookingQuery({ variables: { id: intId } });
  return (
    <>
      {loading && <SpinnerIcon />}
      {(error || (data && data.getBooking.errors)) && <div>An Error has occurred please refresh the page</div>}
      {(data && data.getBooking && data.getBooking.booking) && <DetailsPage booking={data.getBooking.booking} />}
    </>
  )
}
