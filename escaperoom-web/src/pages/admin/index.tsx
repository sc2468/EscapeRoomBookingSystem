import AdminBookingView from '../../components/AdminBookingView';
import Error from '../../components/molecules/Error'
import Layout from '../../components/molecules/Layout'
import Loading from '../../components/molecules/Loading'
import { useGetBookingsQuery } from '../../generated/graphql'

export default function index() {
  const { error, loading, data } = useGetBookingsQuery({ variables: { limit: 3 } });
  return (
    <Layout>
      {loading && <Loading />}
      {error && <Error />}
      {(data && data.getBookings) && <AdminBookingView bookingEntries={data.getBookings} />}
    </Layout>
  )
}