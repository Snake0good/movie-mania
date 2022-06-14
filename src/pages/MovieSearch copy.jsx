import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import HomeButton from '../components/HomeButton'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import SmallMovie from '../components/SmallMovie'

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])

  const location = useLocation()
  const buttonSearchTerm = location.state
  console.log('buttonSearchTerm', buttonSearchTerm)
  

  const API_KEY = `60e1cf29566133f8db1d2b4c631cbf37`
  
  let searchURL = ''
  const initURL = `https://api.themoviedb.org/3/discover/movie?api_key=60e1cf29566133f8db1d2b4c631cbf37&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
  const url = `https://api.themoviedb.org/3/search/movie?api_key=60e1cf29566133f8db1d2b4c631cbf37&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  

  


  useEffect(() => {
      !searchTerm ? searchURL = initURL : searchURL = url
      
      fetch(searchURL) 
      .then(response => response.json())
      .then(data => {
          console.log(data)
          setMovies(data.results)
      })

  }, [])





  return (
    <div className='bg-slate-900 text-white'>
            <Navbar />
            <HomeButton />

            <SearchBar />

            <div className='w-full mt-6'>
            <h1 className='sticky text-3xl'>Your Search Results</h1>
              <div className='flex w-fit h-fit flex-wrap'>
                  {movies.map((movie, id) => (
                      <SmallMovie key={id} pic={movie.poster_path || movie.backdrop_path} title={movie.title || movie.original_name} rating={movie.vote_average} runningTime='' movieID={movie.id}/>
                      ))}
              </div>
        </div>
            





            <Footer />
    </div>
  )
}

export default MovieSearch