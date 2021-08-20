import { Button, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Portal, useToast } from '@chakra-ui/react'
import React from 'react'
import { useCloseBookingMutation } from '../../generated/graphql'

interface Props {
  bookingId: string;
}

export default function CancelPopUp({ bookingId }: Props) {
  const [closeBooking] = useCloseBookingMutation();
  const toast = useToast()

  const close = async () => {
    const response = await closeBooking({ variables: { bookingId: Number.parseInt(bookingId) } });
    if (response.data?.CloseBooking.errors) {
      const errors = response.data?.CloseBooking.errors;
      toast({
        title: "Rooms Created.",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } else if (response.data?.CloseBooking.success) {
      console.log(response.data?.CloseBooking.success);
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
        <PopoverHeader>Close Booking</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          Are you sure you want to close the room at this time
        </PopoverBody>
        <PopoverFooter><Button colorScheme="blue" onClick={close}>Cancel</Button></PopoverFooter>
      </PopoverContent>
    </Portal>
  )
}
