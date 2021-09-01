import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/molecules/Layout';
import RoomCard from '../components/molecules/RoomCard';
import { escapeRooms } from '../constance';
import { customerLinks } from '../constance/menuItems';

export default function rooms() {
  return (
    <Layout menuItems={customerLinks}>
      <Box mt={4}>
        <Grid gap={2} templateColumns={{ md: "repeat(3, 1fr)", base: "repeat(1, 1fr)" }}>
          {escapeRooms.map(room => (<GridItem colSpan={1} m={2} key={room.value} backgroundColor='gray.100' alignItems='center' alignContent='center'>
            <RoomCard roomId={room.value} roomName={room.name}>
              <Text p="4">{room.description}</Text>
              <Button p="4" variant="solid" colorScheme='teal'>Book</Button>
            </RoomCard>
          </GridItem>
          ))
          }
        </Grid>
      </Box>
    </Layout>
  )
}
