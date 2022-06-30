import React, { useState, useEffect } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'



function Fullpage({ movieID, setIsOpen }) {
    console.log(movieID)
    const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'
    let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`

    const [movie, setMovie] = useState()

    useEffect(() => {
        fetch(url) 
        .then(response => response.json())
        .then(data => {
            console.log('data', data)

            let result = data.results

            setMovie(result)
        })

    }, [])

    function showDesc(movie) {
        if(!movie.overview) {
            return 'Sorry, no preview for this movie.'
          } else {
            return movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview
          }
    }



  return (
    <div className='fixed h-screen w-screen bg-[rgba(0,0,0,0.7)] z-50'>
        <div className='flex flex-col p-5 place-items-center'>
            <FaRegWindowClose className='text-2xl' onClick={() => setIsOpen(false)}/>
            <h1 className='text-xl'>This is a full page</h1>
            <p>{ }</p>
        </div>
    </div>
  )
}

export default Fullpage