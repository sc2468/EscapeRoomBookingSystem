import { Box, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link';

export default function NavBar() {
  return (
    <Flex bg="tomato" p={4} ml="auto" position='sticky' top="0" zIndex="2">
      <NextLink href='/'>
        <Link paddingLeft={5}>Home</Link>
      </NextLink>
      <NextLink href='/rooms'>
        <Link paddingLeft={5}>Rooms</Link>
      </NextLink>
      <NextLink href='/bookRoom'>
        <Link paddingLeft={5}>Booking</Link>
      </NextLink>
      <NextLink href='/admin'>
        <Link paddingLeft={5}>Admin</Link>
      </NextLink>
    </Flex>
  )
}
