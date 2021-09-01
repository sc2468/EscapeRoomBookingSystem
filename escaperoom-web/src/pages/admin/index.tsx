import AdminBookingView from '../../components/AdminBookingView';
import Error from '../../components/molecules/Error'
import Layout from '../../components/molecules/Layout'
import Loading from '../../components/molecules/Loading'
import { adminLinks } from '../../constance/menuItems';
import { useGetBookingsQuery } from '../../generated/graphql'

export default function index() {
  const { error, loading, data, fetchMore } = useGetBookingsQuery({ variables: { limit: 3, cursor: null } });
  console.log('new data', data)
  return (
    <Layout menuItems={adminLinks}>
      {loading && <Loading />}
      {error && <Error />}
      {(data && data.getBookings) && <AdminBookingView bookingEntries={data.getBookings} fetchMore={fetchMore} />}
    </Layout>
  )
}