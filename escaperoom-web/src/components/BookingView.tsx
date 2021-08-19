import React, { useMemo, useState } from 'react'
import { BookingsEntity } from '../generated/graphql';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Box, Button, Flex, Grid, GridItem, HStack, Image, Input, Text } from '@chakra-ui/react';
import { bookingStatus, escapeRooms, roomTimes } from '../constance';
import { roomBackgroundSelector } from '../untilies/roomBackgroundSelector';


interface Props {
  bookingEntries: BookingsEntity[]
}

export default function BookingView({ bookingEntries }: Props) {
  const [date, setDate] = useState(new Date());

  const dateHashMap = useMemo(() => bookingEntries.reduce((current, booking) => {
    const bookingDate = booking.date
    if (current[bookingDate]) {
      if (current[bookingDate][booking.roomId]) {
        current[bookingDate][booking.roomId].push({ id: booking.id, time: booking.time, status: booking.status });
      } else {
        current[bookingDate][booking.roomId] = [{ id: booking.id, time: booking.time, status: booking.status }]
      }
    } else {
      current[bookingDate] = { [booking.roomId]: [{ id: booking.id, time: booking.time, status: booking.status }] }
    }
    return current;
  }, {}), bookingEntries)

  console.log(dateHashMap);

  const getBooking = (roomMap, time) => {
    const filterStatus = roomMap.filter(room => room.time === time);
    if (filterStatus.length === 1) {
      return filterStatus[0];
    }
    return undefined;
  }

  const getBookingStatus = (booking) => {
    switch (booking.status) {
      case bookingStatus.open:
        return "Open";
      case bookingStatus.closed:
        return "Closed"
      case bookingStatus.booked:
        return "Booked"
      case bookingStatus.completed:
        return "Complete"
      default:
        return "Unavailable"
    }
  }

  const getRoomMap = (roomId): { time: string, status: string }[] => {
    const dateObject = dateHashMap[date.toLocaleDateString()];
    if (dateObject && dateObject[roomId]) {
      return dateObject[roomId];
    }
    return [];
  }

  const day = 60 * 60 * 24 * 1000;
  return (
    <Box m={4}>
      <HStack>
        <Button fill={'teal'} onClick={() => setDate(new Date(date.getTime() - day))}>-</Button>
        <Input disabled value={date.toDateString()} textAlign={'center'} />
        <Button fill={'teal'} onClick={() => setDate(new Date(date.getTime() + day))}>+</Button>
      </HStack>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room => {
            const roomMap = getRoomMap(room.value);
            return (<GridItem colSpan={1} m={2} key={room.value} backgroundColor='gray.100' alignItems='center' alignContent='center'>
              <Flex direction="column" alignItems='center'>
                <Image
                  m={4}
                  borderRadius="full"
                  boxSize="250px"
                  src={roomBackgroundSelector(room.value)}
                  alt={room.name}
                />
                <Text fontSize="2xl">{room.name}</Text>
                {roomTimes.map(time => {
                  const bookingData = getBooking(roomMap, time.value);
                  return bookingData ? (<Box borderWidth={1} width='100%' onClick={() => location.href = `bookRoom/${bookingData.id}`} >
                    <HStack m={2} justifyContent='space-between' >
                      <Text fontSize='1xl'>{time.startTime}</Text>
                      <Text fontSize='1xl'>{getBookingStatus(bookingData)}</Text>
                    </HStack>
                  </Box>) : (<Box borderWidth={1} width='100%' bg={'lightgray'} >
                    <HStack m={2} justifyContent='space-between' >
                      <Text fontSize='1xl'>{time.startTime}</Text>
                      <Text fontSize='1xl'>Unavailable</Text>
                    </HStack>
                  </Box>)
                })}
              </Flex>
            </GridItem>
            )
          })}
        </Grid>
      </Box>
    </Box >
  );
}
