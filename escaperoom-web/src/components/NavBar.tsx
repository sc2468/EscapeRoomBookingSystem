import { Box, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link';

export default function NavBar() {
  return (
    <Flex bg={"tomato"} p={4} ml={'auto'}>
      <NextLink href='/'>
        <Link paddingLeft={5}>Home</Link>
      </NextLink>
      <NextLink href='/rooms'>
        <Link paddingLeft={5}>Rooms</Link>
      </NextLink>
      <NextLink href='/bookRoom'>
        <Link paddingLeft={5}>Booking</Link>
      </NextLink>
      <NextLink href='/admin/createRooms'>
        <Link paddingLeft={5}>Admin Create Room</Link>
      </NextLink>
      <NextLink href='/admin/bookings'>
        <Link paddingLeft={5}>Admin Bookings</Link>
      </NextLink>
    </Flex>
  )
}
