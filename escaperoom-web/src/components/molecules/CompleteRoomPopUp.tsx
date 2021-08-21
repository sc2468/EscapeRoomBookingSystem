import { Box, Button, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Portal, Text, useToast } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import React from 'react'
import { escapeRooms } from '../../constance'
import { BookingsEntity, useCompleteBookingMutation } from '../../generated/graphql';
import { toErrorMap } from '../../untilies/toErrorMap'
import { InputField } from '../atoms/InputField'
//import { useCloseBookingMutation } from '../../generated/graphql'

interface Props {
  bookingData: BookingsEntity;
}

export default function CompleteRoomPopUp({ bookingData }: Props) {

  const toast = useToast()
  const [completeBooking] = useCompleteBookingMutation()
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
        escapeTime: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        const response = await completeBooking({ variables: { bookingId: id, escapeTime: Number.parseInt(values.escapeTime) } })
        if (response.data?.CompleteBooking.errors) {
          const errors = response.data?.CompleteBooking.errors;
          setErrors(toErrorMap(errors));
          console.log(errors);
          toast({
            title: "Failed to Enter Result.",
            description: "We could not enter the result due to  error.",
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        } else if (response.data?.CompleteBooking.booking) {
          console.log(response.data?.CompleteBooking.booking)

          toast({
            title: "Result Successfully entered",
            description: "The room result has been entered.",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        }
      }}
    >
      {({ isSubmitting }) => (
        <Portal>
          <PopoverContent bg="white">
            <PopoverArrow />
            <PopoverHeader>Enter Result for {roomName} on {formattedDate} at {time}</PopoverHeader>
            <PopoverCloseButton />
            <Form>
              <Box mt={4}>
                <InputField name="escape time" placeholder="Escape Time" label="Escape Time" required />
              </Box>
            </Form>
            <PopoverFooter>
              <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Enter</Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      )}
    </Formik >
  )
}