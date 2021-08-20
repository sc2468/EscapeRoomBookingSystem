import React, { useMemo, useState } from 'react'
import { BookingsEntity } from '../generated/graphql';
import { Box, Button, Grid, GridItem, HStack, Input } from '@chakra-ui/react';
import { bookingStatus, escapeRoom, escapeRooms, roomTime, roomTimes } from '../constance';
import RoomCard from './molecules/RoomCard';
import { bookingStatusObject, createBookingDateHashMap, getBooking, getBookingStatus, getRoomMap } from '../untilies/bookingHelper';
import TimeListItem from './molecules/TimeListItem';
import CancelPopUp from './molecules/CancelPopUp'
import CreateRoomPopUp from './molecules/CreateRoomPopUp';
import BookRoomPopUp from './molecules/BookRoomPopUp';

interface Props {
  bookingEntries: BookingsEntity[]
}

export default function AdminBookingView({ bookingEntries }: Props) {
  const [date, setDate] = useState(new Date());

  const dateHashMap = useMemo(() => createBookingDateHashMap(bookingEntries), bookingEntries)

  const getPopUpContent = (room: escapeRoom, time: roomTime, date: Date, bookingData?: BookingsEntity): React.ReactNode => {
    if (bookingData) {
      switch (bookingData.status) {
        case bookingStatus.open:
          //return <CancelPopUp bookingId={bookingData.id} />
          return <BookRoomPopUp bookingData={bookingData} />
        case bookingStatus.booked:

      }
    }
    return <CreateRoomPopUp roomId={room.value} time={time.value} date={date} />
  }

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
            const roomMap = getRoomMap(dateHashMap, room.value, date);
            return (<GridItem colSpan={1} m={2} key={room.value} backgroundColor='gray.100' alignItems='center' alignContent='center'>
              <RoomCard roomId={room.value} roomName={room.name}>
                {roomTimes.map(time => {
                  const bookingData = getBooking(roomMap, time.value);
                  return (<TimeListItem
                    time={time.fullDisplayName}
                    popoverContent={getPopUpContent(room, time, date, bookingData)}
                    status={bookingData ? getBookingStatus(bookingData) : "Unavailable"}
                  />)
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
