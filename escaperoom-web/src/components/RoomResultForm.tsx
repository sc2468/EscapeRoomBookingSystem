import { Box, Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react'
import { escapeRooms } from '../constance';
import { BookingsEntity, useBookAvailableBookingMutation } from '../generated/graphql';
import { roomBackgroundSelector } from '../untilies/roomBackgroundSelector';
import { toErrorMap } from '../untilies/toErrorMap';
import { InputField } from './InputField';
import Layout from './Layout';

type Props = {
  booking: BookingsEntity
}

export default function RoomResultForm(props: Props) {

  const [bookAvailableBooking] = useBookAvailableBookingMutation();
  const { id, date, time, roomId } = props.booking;
  const roomName = escapeRooms.filter(room => room.value === roomId)[0].name;
  const formattedDate = new Date(date).toLocaleString('en-US', {
    day: 'numeric', // numeric, 2-digit
    year: 'numeric', // numeric, 2-digit
    month: 'long', // numeric, 2-digit, long, short, narrow
    // hour: 'numeric', // numeric, 2-digit
    // minute: 'numeric', // numeric, 2-digit
  });

  return (
    <Box backgroundImage={roomBackgroundSelector(roomId)} height={"100%"}>
      <Layout>
        <Box p={4}>
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
              } else if (response.data?.BookAvailableBooking.booking) {
                console.log(response.data?.BookAvailableBooking.booking)
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Text fontSize="4xl">Book Room</Text>
                <Box mt={4}>
                  <FormLabel>Room</FormLabel>
                  <Input disabled={true} value={roomName}></Input>
                </Box>
                <Box mt={4}>
                  <FormLabel>Date and Time</FormLabel>
                  <Input disabled={true} value={formattedDate}></Input>
                </Box>
                <InputField name="name" placeholder="Team Name" label="Team Name" />
                <Box mt={4}>
                  <InputField name="contactPhoneNumber" placeholder="Phone Number" label="Phone Number" />
                </Box>
                <Box mt={4}>
                  <InputField name="contactEmail" placeholder="Contact Email" label="Contact Email" />
                </Box>
                <Box mt={4}>
                  {/* <InputField name="numberOfPeople" placeholder="Number of People" label="Number Of People" type={'number'} /> */}
                  <NumberInput step={1} defaultValue={2} min={1} max={5}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
                <Box mt={4}>
                  <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Book Room</Button>
                </Box>
              </Form>
            )}
          </Formik >
        </Box>
      </Layout>
    </Box>
  )
}

