import React, { useState } from 'react'
import { BookingsEntity } from '../generated/graphql';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Badge, Box, Button, Flex, Grid, GridItem, HStack, Image, Input, Text } from '@chakra-ui/react';
import { escapeRooms, roomTimes } from '../constance';
import { roomBackgroundSelector } from '../untilies/roomBackgroundSelector';

interface Props {
  bookingEntries: BookingsEntity[]
}

export default function BookingView({ bookingEntries }: Props) {
  const [date, setDate] = useState(new Date())
  // const events = bookingEntries.map((booking) => {
  //   const startDate = new Date(booking.dateAndTime);
  //   const endDate = new Date(booking.dateAndTime);
  //   endDate.setHours(endDate.getHours() + 1);
  //   console.log(startDate, endDate,);
  //   const title = booking.team ? booking.team.name : "Available";

  //   return { id: booking.id, title, start: startDate, end: endDate }
  // });
  // const now = new Date()
  // const minDate = now;
  // minDate.setHours(0, 0, 0, 0)
  // const localizer = momentLocalizer(moment)
  const day = 60 * 60 * 24 * 1000;

  return (
    <Box m={4}>
      <HStack>
        <Button fill={'teal'} onClick={() => setDate(new Date(date.getTime() - day))}>+</Button>
        <Input disabled value={date.toDateString()} textAlign={'center'} />
        <Button fill={'teal'} onClick={() => setDate(new Date(date.getTime() + day))}>-</Button>
      </HStack>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room =>
          (<GridItem colSpan={1} m={2} key={room.value} backgroundColor='gray.100' alignItems='center' alignContent='center'>
            <Flex direction="column" alignItems='center'>
              <Image
                m={4}
                borderRadius="full"
                boxSize="250px"
                src={roomBackgroundSelector(room.value)}
                alt={room.name}
              />
              <Text fontSize="2xl">{room.name}</Text>
              {roomTimes.map(time => (
                <Box borderWidth={1} width='100%'>
                  <HStack m={2} justifyContent='space-between'>
                    <Text fontSize='1xl'>{time.startTime}</Text>
                    <Text fontSize='1xl'>BOOKED</Text>
                  </HStack>
                </Box>
              ))}
            </Flex>
          </GridItem>
          ))}
        </Grid>
      </Box>
    </Box >
  );
}
