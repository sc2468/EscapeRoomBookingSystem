import React, { useMemo, useState } from 'react'
import { BookingsEntity, Exact } from '../generated/graphql';
import { Box, Button, Grid, GridItem, HStack, Input } from '@chakra-ui/react';
import { bookingStatus, escapeRoom, escapeRooms, roomTime, roomTimes } from '../constance';
import RoomCard from './molecules/RoomCard';
import { createBookingDateHashMap, getBooking, getBookingStatus, getRoomMap } from '../untilies/bookingHelper';
import TimeListItem from './molecules/TimeListItem';
import CreateRoomPopUp from './molecules/CreateRoomPopUp';
import BookRoomPopUp from './molecules/BookRoomPopUp';
import CompleteRoomPopUp from './molecules/CompleteRoomPopUp';
import { changeDate, getStartOfDate } from '../untilies/getDateString';

interface Props {
  bookingEntries: BookingsEntity[],
  fetchMore: any,
}

export default function AdminBookingView({ bookingEntries, fetchMore }: Props) {
  const [date, setDate] = useState(getStartOfDate(new Date()));
  const [fetchTillDate, setFetchTillDate] = useState(getStartOfDate(changeDate(date, 3)));
  const dateHashMap = useMemo(() => createBookingDateHashMap(bookingEntries), [bookingEntries])

  const getPopUpContent = (room: escapeRoom, time: roomTime, date: Date, bookingData?: BookingsEntity): React.ReactNode => {
    if (bookingData) {
      switch (bookingData.status) {
        case bookingStatus.open:
          return <BookRoomPopUp bookingData={bookingData} />
        case bookingStatus.booked:
          return <CompleteRoomPopUp bookingData={bookingData} />
      }
    }
    return <CreateRoomPopUp roomId={room.value} time={time.value} date={date} />
  }

  const descDate = () => {
    const newDate = changeDate(date, -1);
    if (newDate >= getStartOfDate(new Date())) {
      setDate(newDate);
    }
  }

  const increaseDate = () => {
    console.log(fetchTillDate, date);
    if (date.getTime() === fetchTillDate.getTime()) {
      fetchMore({ variables: { limit: 1, cursor: fetchTillDate.getTime().toString() } });
      setDate(changeDate(date, 1));
      setFetchTillDate(changeDate(fetchTillDate, 1));
    } else {
      setDate(changeDate(date, +1));
    }
  }


  return (
    <Box m={4}>
      <HStack spacing="8">
        <Button colorScheme="teal" onClick={descDate} variant="solid">-</Button>
        <Input disabled value={date.toDateString()} textAlign={'center'} />
        <Button colorScheme="teal" onClick={increaseDate} variant="solid">+</Button>
      </HStack>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room => {
            const roomMap = getRoomMap(dateHashMap, room.value, date);
            //console.log(roomMap);
            return (<GridItem key={`roomItem-${room.value}`} colSpan={1} m={2} backgroundColor='gray.100' alignItems='center' alignContent='center'>
              <RoomCard roomId={room.value} roomName={room.name}>
                {roomTimes.map(time => {
                  const bookingData = getBooking(roomMap, time.value);
                  return (<TimeListItem
                    key={`roomItem-${room.value}-time-${time.value}`}
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
