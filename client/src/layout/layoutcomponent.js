import React from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import Footer from './Footer'
import { Box, Container } from '@mui/system'

const LayoutComponent = ({ children, user, handleLogout }) => {
  return (
    <div className='layout-component'>
        <Navigation user={user} logoutUser={handleLogout}/>
        <Box component='main' className='main-component-wrapper'>
          {children}
        </Box>
        <Footer />
    </div>
  )
}

export default LayoutComponent