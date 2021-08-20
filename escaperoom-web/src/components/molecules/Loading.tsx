import { Flex, HStack, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function Loading() {
  return (
    <HStack flexBasis={1} spacing={8} justifyContent={'center'}>
      <Text fontSize="3xl">Loading...</Text>
      <Spinner size="md" />
    </HStack>
  )
}
