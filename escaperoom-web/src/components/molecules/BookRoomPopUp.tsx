import { Box, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Portal, Text, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { escapeRooms } from '../../constance'
import { BookingsEntity, useBookAvailableBookingMutation } from '../../generated/graphql'
import { bookingStatusObject } from '../../untilies/bookingHelper'
import { toErrorMap } from '../../untilies/toErrorMap'
import { InputField } from '../atoms/InputField'
//import { useCloseBookingMutation } from '../../generated/graphql'

interface Props {
  bookingData: BookingsEntity;
}

export default function BookRoomPopUp({ bookingData }: Props) {

  const toast = useToast()
  const [bookAvailableBooking] = useBookAvailableBookingMutation();
  const { id, date, time, roomId, } = bookingData;
  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
  });
  return (
    <Formik
      initialValues={{
        name: "",
        contactPhoneNumber: "",
        contactEmail: "",
        numberOfPeople: 2
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await bookAvailableBooking({ variables: { bookingId: id, options: { ...values } } })
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
        <Portal>
          <PopoverContent bg="white">
            <PopoverArrow />
            <PopoverHeader>Book {roomName} on {formattedDate} at {time}</PopoverHeader>
            <PopoverCloseButton />
            <Form>
              <Box mt={4}>
                <InputField name="name" placeholder="Team Name" label="Team Name" required />
              </Box>
              <Box mt={4}>
                <InputField name="contactPhoneNumber" placeholder="Phone Number" label="Phone Number" required />
              </Box>
              <Box mt={4}>
                <InputField name="contactEmail" placeholder="Contact Email" label="Contact Email" required />
              </Box>
              <Box mt={4}>
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
              <Box mt={4}>
              </Box>
            </Form>
            <PopoverFooter>
              <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Book Room</Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      )}
    </Formik >
  )
}