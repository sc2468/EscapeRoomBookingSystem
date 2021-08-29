import { Box, Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextServer } from 'next/dist/server/next';
import React from 'react'
import { escapeRooms } from '../../constance';
import { BookingsEntity, useBookAvailableBookingMutation } from '../../generated/graphql';
import { roomBackgroundSelector } from '../../untilies/roomBackgroundSelector';
import { toErrorMap } from '../../untilies/toErrorMap';
import { InputField } from '../atoms/InputField';
import Layout from '../molecules/Layout';

type Props = {
  booking: BookingsEntity
}

export default function BookingForm(props: Props) {

  const [bookAvailableBooking] = useBookAvailableBookingMutation();
  const { id, date, time, roomId } = props.booking;
  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
  });
  return (
    <Box p={4}>
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
              <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Book Room</Button>
            </Box>
          </Form>
        )}
      </Formik >
    </Box>
  )
}
