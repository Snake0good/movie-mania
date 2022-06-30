import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

function HomeButton() {
  return (
    <div className='w-full'>
        <a 
        href="/" 
        className='inline-flex place-items-center p-2 pr-5 pl-5 m-3 border-2 border-white rounded-lg text-white'>
        <FaArrowLeft className='mr-3'/> 
        HOME
        </a>
    </div>
  )
}

export default HomeButton