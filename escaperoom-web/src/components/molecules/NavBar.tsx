import { Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link';


interface props {
  links: { displayName: string, route: string }[]
}

export default function NavBar({ links }) {
  return (
    <Flex bg="tomato" p={4} ml="auto" position='sticky' top="0" zIndex="2">
      {links.map(link => (
        <NextLink href={link.route}>
          <Link paddingLeft={5}>{link.displayName}</Link>
        </NextLink>
      ))}
    </Flex>
  )
}
