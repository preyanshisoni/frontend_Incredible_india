import React from 'react'
import { Navbar } from './Navbar'
import Footer from './Footer/Footer'

function CommonLayout({children}) {
  return (
    <div>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
            </div>
  )
}

export default CommonLayout;