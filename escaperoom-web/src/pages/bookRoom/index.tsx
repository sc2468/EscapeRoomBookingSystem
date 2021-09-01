import React from 'react'
import BookingView from '../../components/BookingView'
import Error from '../../components/molecules/Error'
import Layout from '../../components/molecules/Layout'
import Loading from '../../components/molecules/Loading'
import { customerLinks } from '../../constance/menuItems'
import { useGetBookingsQuery } from '../../generated/graphql'

export default function index() {
  const { error, loading, data, fetchMore } = useGetBookingsQuery({ variables: { limit: 3, cursor: null } });
  return (
    <Layout menuItems={customerLinks}>
      {loading && <Loading />}
      {error && <Error />}
      {(data && data.getBookings) && (<BookingView
        bookingEntries={data.getBookings}
        fetchMore={fetchMore}
      />)}
    </Layout>
  )
}
