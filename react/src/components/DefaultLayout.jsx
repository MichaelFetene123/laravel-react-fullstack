import React from 'react'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
  return (
    <div>
        this is DefaultLayout
        <Outlet />
    </div>
  )
}

export default DefaultLayout