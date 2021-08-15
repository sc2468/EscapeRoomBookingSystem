import { Text } from '@chakra-ui/react'
import React from 'react'
import { bookingStatus, escapeRooms } from '../constance'
import { BookingsEntity } from '../generated/graphql'
import BookingForm from './BookingForm'
import Layout from './Layout'

interface Props {
  booking: BookingsEntity
}

function DetailsPage(props: Props) {
  const { roomId, dateAndTime, status, team, result } = props.booking;

  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDateAndTime = new Date(dateAndTime).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    hour: 'numeric', // numeric, 2-digit
    minute: 'numeric', // numeric, 2-digit
  });
  return (
    <Layout>
      <Text fontSize="4xl">Book Room</Text>
      <Text fontSize="2xl"><b>{roomName}</b> at <b>{formattedDateAndTime}</b></Text>
      {status === bookingStatus.open && <BookingForm booking={props.booking} />}
      {status === bookingStatus.booked && team?.name && <Text fontSize="2xl">booked by {team.name}</Text>}
      {status === bookingStatus.completed && team?.name && result?.escapeTime && <Text fontSize="2xl">Completed By {team.name} in {result.escapeTime}</Text>}
      {status === bookingStatus.closed && <Text fontSize="2xl">This booking has been closed</Text>}
    </Layout >
  )
}

export default DetailsPage
