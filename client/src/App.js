import { useEffect, useState } from "react";
import Rows from "./components/Rows";
import Navbar from './components/Navbar'
import Footer from "./components/Footer";
import { FaInfo, FaPlay, FaStar } from "react-icons/fa";

import { Link, Outlet } from 'react-router-dom'


function App() {  
  const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'
  let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`

  const [topMovie, setTopMovie] = useState([])

  useEffect(() => {
      fetch(url) 
      .then(response => response.json())
      .then(data => {
        console.log(data)
        let random = Math.floor(Math.random() * data.results.length)
        let theMovie = data.results[random]
        setTopMovie(theMovie)
      })
  }, [])

  function showDescLength(movie) {
    if(!movie.overview) {
      return 'Sorry, no preview for this movie.'
    } else {
      return movie.overview.length > 200 ? `${movie.overview.substring(0, 200)}...` : movie.overview
    }
  }

  return (
    <div className="App bg-slate-900 text-white">
        <Navbar />

                    
        <div className="h-[400px] object-center w-screen relative flex">

          <img className="h-full w-full object-cover md:w-[60%]" src={`https://image.tmdb.org/t/p/w500/${topMovie.backdrop_path}`} />
          <div className="absolute bottom-0 w-80 p-3 bg-[rgba(0,0,0,0.6)] rounded-tr-xl md:w-[40%] md:relative md:rounded-none md:justify-center md:flex md:flex-col md:p-4">
            <div className="flex space-x-4">
              <h1 className="text-3xl font-bold">
              {topMovie.title || topMovie.name}</h1>
              <span className="inline-flex place-items-center text-xl text-yellow-300"> { topMovie.vote_average > 0 ? topMovie.vote_average.toFixed(1) : topMovie.vote_average } <FaStar />
              </span>
            </div>
            
            <p className="text-sm md:hidden">{ showDescLength(topMovie) }</p> 
            <p className="text-sm hidden md:block md:mt-5 md:mb-5"> { topMovie.overview } </p>
            <div>
              <Link 
                to='/watching'
                state={{
                  movieID: topMovie.id,
                  mediaType: topMovie.media_type
                }}
                  >
                <button className="bg-white text-black p-1 pl-5 pr-5 mr-2 inline-flex place-items-center">
                  <FaPlay className="mr-3"/> 
                  Play 
                </button>
              </Link>
              <Link
                to="/movieInfo"
                state={{
                  movieID: topMovie.id,
                  mediaType: topMovie.media_type
                }}
              >
                <button className="bg-[rgba(255,255,255,0.3)] text-white p-1 pl-5 pr-5 mr-2 inline-flex place-items-center">
                <FaInfo className="mr-3"/> 
                Info 
                </button>
              </Link> 
            </div>
          </div>
        </div>

        <div className="p-4">
          <Rows rowID={1} topTitle="Trending Now" searchTerm='trending' />
          <Rows rowID={2} topTitle="Popular" searchTerm='popular' />
          <Rows rowID={3} topTitle="Comedies" searchTerm='comedy' />
          <Rows rowID={4} topTitle="Money" searchTerm='economics' />  
          <Rows rowID={5} topTitle="Teens" searchTerm='teen' />
          <Rows rowID={6} topTitle="Horror" searchTerm='horror' /> 
        </div>
        
        <Footer />
    </div>
  )
}

export default App;
