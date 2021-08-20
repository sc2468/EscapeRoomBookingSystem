import { WarningIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'
import React from 'react'

export default function Error() {
  return (
    <HStack flexBasis={1} spacing={8} justifyContent={'center'}>
      <Text fontSize="3xl">An Error has occurred please refresh the page</Text>
      <WarningIcon boxSize={8} />
    </HStack>
  )
}
