import { SpinnerIcon } from '@chakra-ui/icons';
import React from 'react'
import DetailsPage from '../../components/DetailsPage';
import Error from '../../components/molecules/Error';
import Loading from '../../components/molecules/Loading';
import { useGetBookingQuery } from '../../generated/graphql';
import { useGetIntId } from '../../untilies/useGetIntId'

export default function BookRoom() {
  const intId = useGetIntId();
  const { data, error, loading } = useGetBookingQuery({ variables: { id: intId } });
  return (
    <>
      {loading && <Loading />}
      {(error || (data && data.getBooking.errors)) && <Error />}
      {(data && data.getBooking && data.getBooking.booking) && <DetailsPage booking={data.getBooking.booking} />}
    </>
  )
}
