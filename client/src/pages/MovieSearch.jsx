import React from 'react'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Footer from '../components/Footer'
import HomeButton from '../components/HomeButton'
import Navbar from '../components/Navbar'
import SmallMovie from '../components/SmallMovie'

function MovieSearch() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const url = `https://api.themoviedb.org/3/search/movie?api_key=60e1cf29566133f8db1d2b4c631cbf37&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  

  const handelClick = async () => {
    setIsLoading(true);

    try {
      const respones = await fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMovies(data.results)
      })
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className='bg-slate-900 text-white min-h-screen flex flex-col place-content-between	'>
            <Navbar />
            <HomeButton />


          {/* this is the search bar - i couldnt get it as its own component */}
            <div className='ml-3 mr-3 max-w-4xl'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                  <input value={searchTerm} onInput={e => setSearchTerm(e.target.value)}
                  type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your movie search here..." required="" />
                  
                  <button 
                    type="submit" 
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handelClick}>
                      Search
                  </button>
                </div>
            </div>



            <div className='w-full mt-6'>
            <h1 className='sticky text-3xl'>Your Movie Search Results</h1>
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