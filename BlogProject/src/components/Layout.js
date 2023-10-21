import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className='App'>
      <Header></Header>
      <Outlet></Outlet>
    </div>
    
  )
}
