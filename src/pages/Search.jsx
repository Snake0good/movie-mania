import React from 'react'
import { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import SmallMovie from '../components/SmallMovie'

function Search() {
  const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  
  
  let searchURL = ''
  const initURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`


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
    <div className='bg-slate-900 text-white min-h-screen flex flex-col place-content-between	'>
            <Navbar />
            <div className='w-full'>
                <a 
                href="/" 
                className='inline-flex place-items-center p-2 pr-5 pl-5 m-3 border-2 border-white rounded-lg text-white'>
                <FaArrowLeft className='mr-3'/> 
                BACK
                </a>
            </div>

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

export default Search