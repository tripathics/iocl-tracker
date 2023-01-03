import React from 'react'
import Navbar from './Navbar'
import Navigation from './Navigation'
import Footer from './Footer'
import { Box, Container } from '@mui/system'

const LayoutComponent = ({ children, user, handleUser }) => {
  return (
    <div className='layout-component'>
        <Navigation user={user}/>
        <Box component='main' className='main-component-wrapper'>
          {children}
        </Box>
        <Footer />
    </div>
  )
}

export default LayoutComponent