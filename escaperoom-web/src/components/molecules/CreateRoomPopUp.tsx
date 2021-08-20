import { Button, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Portal, useToast } from '@chakra-ui/react'
import React from 'react'
import { useCreateAvailableBookingMutation } from '../../generated/graphql'
import { getStartOfDateSeconds } from '../../untilies/getDateString'

interface Props {
  roomId: number;
  time: string;
  date: Date;
}

export default function CreateRoomPopUp({ roomId, time, date }: Props) {
  const [createBooking] = useCreateAvailableBookingMutation()
  const toast = useToast()

  const create = async () => {
    const response = await createBooking({ variables: { roomId: roomId, bookingTime: time, bookingDate: getStartOfDateSeconds(date) } });
    if (response.data?.createAvailableBooking.booking) {
      toast({
        title: "Rooms Created.",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } else if (response.data?.createAvailableBooking) {
      console.log(response.data?.createAvailableBooking);
      toast({
        title: "Rooms Closed.",
        description: "The room was closed",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }

  }

  return (
    <Portal>
      <PopoverContent bg="white">
        <PopoverArrow />
        <PopoverHeader>Open Booking</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to open a room at this date and time
        </PopoverBody>
        <PopoverFooter><Button colorScheme="blue" onClick={create}>Create</Button></PopoverFooter>
      </PopoverContent>
    </Portal>
  )
}
