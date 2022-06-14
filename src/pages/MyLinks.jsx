import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Footer from '../components/Footer'
import HomeButton from '../components/HomeButton'
import Navbar from '../components/Navbar'

function MyLinks() {
  return (
    <div className='bg-slate-900 text-white min-h-screen flex flex-col place-content-between	'>
            <Navbar />
            <HomeButton />





            <Footer />
    </div>
  )
}

export default MyLinks