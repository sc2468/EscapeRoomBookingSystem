import React from 'react'
import BookingView from '../../components/BookingView'
import Error from '../../components/molecules/Error'
import Layout from '../../components/molecules/Layout'
import Loading from '../../components/molecules/Loading'
import { useGetBookingsQuery } from '../../generated/graphql'

export default function index() {
  const { error, loading, data } = useGetBookingsQuery();
  return (
    <Layout>
      {loading && <Loading />}
      {error && <Error />}
      {(data && data.getBookings) && <BookingView bookingEntries={data.getBookings} />}
    </Layout>
  )
}
