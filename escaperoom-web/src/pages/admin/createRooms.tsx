import { Box, Button, Checkbox, FormControl, FormLabel, Select, Text, toast, useToast } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import React from 'react'
import { InputField } from '../../components/atoms/InputField';
import Layout from '../../components/molecules/Layout';
import { escapeRooms, roomTimes } from '../../constance';
import { BookingItemInput, useCreateAvailableBookingsMutation } from '../../generated/graphql'
import { getStartOfDateSeconds } from '../../untilies/getDateString';
import { toErrorMap } from '../../untilies/toErrorMap';

export default function createRooks() {
  const [bulkCreate] = useCreateAvailableBookingsMutation();
  const toast = useToast()

  return (
    <Layout>
      <Box m={4}>
        <Formik
          initialValues={{
            roomId: 1,
            day: new Date().toISOString().slice(0, 10),
            time: [],
          }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values)
            const newBookings: BookingItemInput[] = values.time.map((time) => ({
              roomId: values.roomId,
              date: getStartOfDateSeconds(new Date(values.day)),
              time
            }))
            const response = await bulkCreate({ variables: { createAvailableBookingsBookings: newBookings } })
            if (response.data?.createAvailableBookings.errors) {
              const errors = response.data?.createAvailableBookings.errors;
              setErrors(toErrorMap(errors));
            } else if (response.data?.createAvailableBookings.success) {
              toast({
                title: "Rooms Created.",
                description: "We've created the rooms",
                status: "success",
                duration: 9000,
                isClosable: true,
              })
            }
          }}
        >
          {({ isSubmitting, values: { day } }) => (
            <Form>
              <Text fontSize="5xl">Create New Available Bookings</Text>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="Select Room">Select Room</FormLabel>
                <Field as="select" name="roomId" >
                  {escapeRooms.map(room =>
                    <option key={room.value} value={room.value}>{room.name}</option>
                  )}
                </Field>
              </FormControl>
              <Box mt={4}>
                <InputField name="day" label="Day" type="date" placeholder={'Day'} value={day} />
              </Box>
              <FormControl isRequired mt={4}>
                <FormLabel htmlFor="Select Times">Select Times</FormLabel>
                {
                  roomTimes.map(roomTime => (
                    <Box mt={4} key={roomTime.value}>
                      <Field name={'time'}>
                        {({ field }: FieldProps) =>
                          <Checkbox {...field} name="time" value={roomTime.value}>{roomTime.fullDisplayName}</Checkbox>
                        }
                      </Field>
                    </Box>
                  ))
                }
              </FormControl>
              <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Create Rooms</Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout >
  )
}
