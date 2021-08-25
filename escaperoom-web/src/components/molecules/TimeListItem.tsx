import { Popover, PopoverTrigger, Box, HStack, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Button, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
  popoverContent: React.ReactNode,
  time: string,
  status: string
}

export default function TimeListItem({ popoverContent, time, status }: Props) {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Box borderWidth={1} width='100%' bg={'lightgray'} >
          <HStack m={2} justifyContent='space-between' >
            <Text fontSize='1xl'>{time}</Text>
            <Text fontSize='1xl'>{status}</Text>
          </HStack>
        </Box>
      </PopoverTrigger>
      <Portal>
        {popoverContent}
      </Portal>
    </Popover>
  )
}
