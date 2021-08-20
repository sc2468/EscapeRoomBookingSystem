import React, { useMemo, useState } from 'react'
import { BookingsEntity } from '../generated/graphql';
import { Box, Button, Grid, GridItem, HStack, Input, Text } from '@chakra-ui/react';
import { escapeRooms, roomTimes } from '../constance';
import RoomCard from './molecules/RoomCard';
import { createStatusDateHashMap, getBooking, getBookingStatus, getRoomMap, getStatusBooking, getStatusRoomMap } from '../untilies/bookingHelper';

interface Props {
  bookingEntries: BookingsEntity[]
}

export default function AdminBookingView({ bookingEntries }: Props) {
  const [date, setDate] = useState(new Date());

  const dateHashMap = useMemo(() => createStatusDateHashMap(bookingEntries), bookingEntries)

  const day = 60 * 60 * 24 * 1000;
  return (
    <Box m={4}>
      <HStack spacing="8">
        <Button colorScheme="teal" onClick={() => setDate(new Date(date.getTime() - day))} variant="solid">-</Button>
        <Input disabled value={date.toDateString()} textAlign={'center'} />
        <Button colorScheme="teal" onClick={() => setDate(new Date(date.getTime() + day))} variant="solid">+</Button>
      </HStack>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room => {
            const roomMap = getStatusRoomMap(dateHashMap, room.value, date);
            return (<GridItem colSpan={1} m={2} key={room.value} backgroundColor='gray.100' alignItems='center' alignContent='center'>
              <RoomCard roomId={room.value} roomName={room.name}>
                {roomTimes.map(time => {
                  const bookingData = getStatusBooking(roomMap, time.value);
                  return bookingData ? (<Box borderWidth={1} width='100%' onClick={() => location.href = `bookRoom/${bookingData.id}`} >
                    <HStack m={2} justifyContent='space-between' >
                      <Text fontSize='1xl'>{time.startTime}</Text>
                      <Text fontSize='1xl'>{getBookingStatus(bookingData)}</Text>
                    </HStack>
                  </Box>) : (
                    <Box borderWidth={1} width='100%' bg={'lightgray'} >
                      <HStack m={2} justifyContent='space-between' >
                        <Text fontSize='1xl'>{time.startTime}</Text>
                        <Text fontSize='1xl'>Unavailable</Text>
                      </HStack>
                    </Box>)
                })}
              </RoomCard>
            </GridItem>
            )
          })}
        </Grid>
      </Box>
    </Box >
  );
}
