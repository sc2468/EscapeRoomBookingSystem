import { Text } from '@chakra-ui/react'
import React from 'react'
import { bookingStatus, escapeRooms } from '../constance'
import { customerLinks } from '../constance/menuItems'
import { BookingsEntity } from '../generated/graphql'
import BookingForm from './forms/BookingForm'
import Layout from './molecules/Layout'

interface Props {
  booking: BookingsEntity
}

function DetailsPage(props: Props) {
  const { roomId, date, time, status, team, result } = props.booking;

  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
  });
  return (
    <Layout menuItems={customerLinks}>
      <Text fontSize="4xl">Book Room</Text>
      <Text fontSize="2xl"><b>{roomName}</b> at <b>{formattedDate} {time}</b></Text>
      {status === bookingStatus.open && <BookingForm booking={props.booking} />}
      {status === bookingStatus.booked && team?.name && <Text fontSize="2xl">booked by {team.name}</Text>}
      {status === bookingStatus.completed && team?.name && result?.escapeTime && <Text fontSize="2xl">Completed By {team.name} in {result.escapeTime}</Text>}
      {status === bookingStatus.closed && <Text fontSize="2xl">This booking has been closed</Text>}
    </Layout >
  )
}

export default DetailsPage
