import React from 'react'

function Actor({ name, character, pic }) {

  function checkPics() {
    if(pic== null) {
      pic = 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png'
    } else {
      pic = `https://image.tmdb.org/t/p/w500/${pic}`
    }
  }

  checkPics()

  return (
    <div className='w-32 h-44 flex flex-col m-2 text-center border-2 border-white shadow-xl rounded-xl overflow-hidden relative'>
        <img  
          className='w-full object-cover' 
          src={ pic }
          alt={Math.random()}/>
        <div className='absolute bottom-0 flex flex-col justify-content w-full'>
            <h1 className='font-bold text-sm bg-black h-10'>{name}</h1>
        </div>
    </div>
  )
}

export default Actor