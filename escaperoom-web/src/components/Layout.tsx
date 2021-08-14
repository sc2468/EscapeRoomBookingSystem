import React from 'react'
import NavBar from './NavBar'
import { Wrapper } from './Wrapper'

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Wrapper>{children}</Wrapper>
    </>
  )
}
