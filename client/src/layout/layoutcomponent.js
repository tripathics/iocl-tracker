import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const LayoutComponent = ({ children }) => {
  return (
    <div className='layout-component'>
        <Navbar />
        <main className='main-component-wrapper'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default LayoutComponent