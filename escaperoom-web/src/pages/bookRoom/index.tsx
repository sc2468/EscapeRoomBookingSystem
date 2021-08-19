import { gql, useQuery } from '@apollo/client'
import { SpinnerIcon } from '@chakra-ui/icons'
import React from 'react'
import BookingCalender from '../../components/BookingCalender'
import BookingView from '../../components/BookingView'
import Layout from '../../components/Layout'
import { useGetBookingsQuery } from '../../generated/graphql'

export default function index() {
  //const { error, loading, data } = useGetBookingsQuery()
  const { error, loading, data } = useGetBookingsQuery();
  return (
    <Layout>
      {loading && <SpinnerIcon />}
      {error && <div>An Error has occurred please refresh the page</div>}
      {(data && data.getBookings) && <BookingView bookingEntries={data.getBookings} />}
    </Layout>
  )
}
