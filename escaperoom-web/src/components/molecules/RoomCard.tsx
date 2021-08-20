import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { roomBackgroundSelector } from '../../untilies/roomBackgroundSelector';

interface Props {
  roomId: number;
  roomName: string;
  children: React.ReactNode
}

export default function RoomCard({ roomId, roomName, children }: Props) {
  return (
    <Flex direction="column" alignItems='center'>
      <Image
        m={4}
        borderRadius="full"
        boxSize="250px"
        src={roomBackgroundSelector(roomId)}
        alt={roomName}
      />
      <Text fontSize="2xl">{roomName}</Text>
      {children}
    </Flex>
  )
}
