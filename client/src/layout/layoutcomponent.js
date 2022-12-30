import React from 'react'
import Navbar from './Navbar'
import MyNavComponent from './Nav'
import Footer from './Footer'

const LayoutComponent = ({ children, user }) => {
  return (
    <div className='layout-component'>
        {/* <Navbar /> */}
        <MyNavComponent user={user}/>
        <main className='main-component-wrapper'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default LayoutComponent