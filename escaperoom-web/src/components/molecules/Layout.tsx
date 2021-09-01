import React from 'react'
import NavBar from './NavBar'
import { Wrapper } from '../atoms/Wrapper'
import { menuItem } from '../../constance/menuItems'

interface props {
  menuItems: menuItem[]
}

export default function Layout({ children, menuItems }) {
  return (
    <>
      <NavBar links={menuItems} />
      <Wrapper>{children}</Wrapper>
    </>
  )
}
