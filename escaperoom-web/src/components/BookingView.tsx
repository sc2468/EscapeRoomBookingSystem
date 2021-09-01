import React, { useMemo, useState } from 'react'
import { BookingsEntity } from '../generated/graphql';
import { Box, Button, Grid, GridItem, HStack, Input, Text } from '@chakra-ui/react';
import { bookingStatus, escapeRooms, roomTimes } from '../constance';
import RoomCard from './molecules/RoomCard';
import { createBookingDateHashMap, getBooking, getRoomMap } from '../untilies/bookingHelper';
import { changeDate, getStartOfDate } from '../untilies/getDateString';
import BookRoomPopUp from './molecules/BookRoomPopUp';;
import TimeListItem from './molecules/TimeListItem';
import { dateVar, fetchTillVar } from '../untilies/createApolloClient';

interface Props {
  bookingEntries: BookingsEntity[],
  fetchMore: any,
}

export default function AdminBookingView({ bookingEntries, fetchMore }: Props) {
  const [date, setDate] = useState(getStartOfDate(dateVar()));
  const [fetchTillDate, setFetchTillDate] = useState(new Date(fetchTillVar()));
  const dateHashMap = useMemo(() => createBookingDateHashMap(bookingEntries), [bookingEntries])

  const descDate = () => {
    const newDate = changeDate(date, -1);
    if (newDate >= getStartOfDate(new Date())) {
      setDate(newDate);
      dateVar(newDate);

    }
  }

  const increaseDate = () => {
    if (date.getTime() === fetchTillDate.getTime()) {
      fetchMore({ variables: { limit: 1, cursor: fetchTillDate.getTime().toString() } });
      setDate(changeDate(date, 1));
      setFetchTillDate(changeDate(fetchTillDate, 1));
      dateVar(changeDate(dateVar(), 1));
      const day = 60 * 60 * 24 * 1000;
      fetchTillVar(fetchTillVar() + day);
    } else {
      setDate(changeDate(date, 1))
      dateVar(changeDate(dateVar(), 1));
    }
  }

  return (
    <Box m={4}>
      <Text fontSize="4xl">Booking Schedule</Text>
      <HStack spacing="4">
        <Button colorScheme="teal" onClick={descDate} variant="solid">-</Button>
        <Input disabled value={date.toDateString()} textAlign={'center'} />
        <Button colorScheme="teal" onClick={increaseDate} variant="solid">+</Button>
      </HStack>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room => {
            const roomMap = getRoomMap(dateHashMap, room.value, date);
            return (<GridItem key={`roomItem-${room.value}`} colSpan={1} m={2} backgroundColor='gray.100' alignItems='center' alignContent='center'>
              <RoomCard roomId={room.value} roomName={room.name}>
                {roomTimes.map(time => {
                  const bookingData = getBooking(roomMap, time.value);
                  return (<TimeListItem
                    key={`roomItem-${room.value}-time-${time.value}`}
                    time={time.startTime}
                    popoverContent={bookingData && bookingData.status === bookingStatus.open ? <BookRoomPopUp bookingData={bookingData} /> : null}
                    status={bookingData && bookingData.status === bookingStatus.open ? "Open" : "Unavailable"}
                  />)
                })}
              </RoomCard>
            </GridItem>
            )
          })}
        </Grid>
      </Box >
    </Box >
  );
}
