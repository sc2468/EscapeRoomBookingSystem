import React from 'react'
import Layout from '../components/molecules/Layout'
import { customerLinks } from '../constance/menuItems'

export default function index() {
  return (
    <Layout menuItems={customerLinks}>
      <div>Home</div>
    </Layout>
  )
}
