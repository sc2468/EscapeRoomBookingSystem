import { gql } from '@apollo/client'
import { Box, Button, FormControl, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Portal, Text, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { escapeRooms } from '../../constance'
import { BookingsEntity, GetBookingsDocument, GetBookingsQuery, useBookAvailableBookingMutation, useCloseOpenBookingMutation } from '../../generated/graphql'
import { toErrorMap } from '../../untilies/toErrorMap'
import { InputField } from '../atoms/InputField'

interface Props {
  bookingData: BookingsEntity;
}

export default function BookRoomPopUp({ bookingData }: Props) {

  const toast = useToast()
  const [bookAvailableBooking] = useBookAvailableBookingMutation();

  const [closeBooking] = useCloseOpenBookingMutation({
    update(cache, { data: { CloseOpenBooking } }) {
      if (CloseOpenBooking && CloseOpenBooking.success && CloseOpenBooking.success === true) {
        const closedBookingId = CloseOpenBooking.bookingId;
        cache.modify({
          fields: {
            getBookings(existingBookings = []) {
              const otherBookings = existingBookings.filter(booking => booking.id === closedBookingId)
              return [...otherBookings];
            }
          }
        })
      }
    }
  });

  const close = async () => {
    const response = await closeBooking({ variables: { bookingId: Number.parseInt(bookingData.id) } });
    if (response.data?.CloseOpenBooking.errors) {
      const errors = response.data?.CloseOpenBooking.errors;
      console.log(errors);
      toast({
        title: "Rooms Could not be closed.",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else if (response.data?.CloseOpenBooking.success) {
      console.log(response.data?.CloseOpenBooking.success);
      toast({
        title: "Rooms Closed.",
        description: "The room was closed",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const { id, date, time, roomId, } = bookingData;
  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
  });
  return (
    <Portal>
      <PopoverContent bg="white">
        <PopoverArrow />
        <PopoverHeader>Book {roomName} on {formattedDate} at {time}</PopoverHeader>
        <PopoverCloseButton />
        <Box m={2}>
          <Formik
            initialValues={{
              name: "",
              contactPhoneNumber: "",
              contactEmail: "",
              numberOfPeople: 2
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await bookAvailableBooking({ variables: { bookingId: parseInt(id), options: { ...values } } })
              if (response.data?.BookAvailableBooking.errors) {
                const errors = response.data?.BookAvailableBooking.errors;
                setErrors(toErrorMap(errors));
                console.log(errors);
              } else if (response.data?.BookAvailableBooking.booking) {
                console.log(response.data?.BookAvailableBooking.booking)
              }
            }}
          >
            {({ isSubmitting, values: { numberOfPeople } }) => (
              <Form>
                <Box mt={2}>
                  <InputField name="name" placeholder="Team Name" label="Team Name" required />
                </Box>
                <Box mt={2}>
                  <InputField name="contactPhoneNumber" placeholder="Phone Number" label="Phone Number" required />
                </Box>
                <Box mt={2}>
                  <InputField name="contactEmail" placeholder="Contact Email" label="Contact Email" required />
                </Box>
                <Box mt={2}>
                  <FormControl isRequired>
                    <FormLabel>Number of People</FormLabel>
                    <NumberInput step={1} defaultValue={2} min={1} max={5} >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <Text fontSize="1xl">Price for <b>{numberOfPeople}</b> is <b>${numberOfPeople * 25}</b></Text>
                </Box>
                <Box mt={2}>
                </Box>
                <HStack justifyContent="space-between">
                  <Button mt={2} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Book Room</Button>
                  <Button mt={2} bgColor={'teal'} variant="solid" onClick={close}>Close Booking</Button>
                </HStack>
              </Form>
            )}
          </Formik >
        </Box>
      </PopoverContent>
    </Portal>
  )
}
