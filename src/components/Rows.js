import React, { useState, useEffect } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import SmallMovie from './SmallMovie'

function Rows({topTitle, searchTerm, rowID}) {
    const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`

    if (searchTerm === 'popular') {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    } else if (searchTerm === 'top_rated') {
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    } else if (searchTerm === 'comedy') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=funny&page=1`
    } else if (searchTerm === 'action') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=action&page=1`
    } else if (searchTerm === 'teen') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=teen&page=1`
    } else if (searchTerm === 'horror') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=horror&page=1`
    }

    const [movies, setMovies] = useState([])

    function moveRight() {
        let slider = document.getElementById('slider' + rowID)
        slider.scrollLeft = slider.scrollLeft + 1000
        console.log('move right')
    }

    function moveLeft() {
        console.log('move left')
    }


    useEffect(() => {
        fetch(url) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setMovies(data.results)
        })

    }, [])

    return (
        <div className='relative w-full mt-6'>
            <h1 className='sticky text-3xl'>{topTitle}</h1>
            <div className='no-scrollbar relative overflow-y-hidden overflow-x-auto'>
                {/* <FaCaretLeft 
                    className='absolute left-0 w-5 h-full bg-[rgba(0,0,0,0.6)] z-[20]'
                    onClick={moveLeft} /> */}
                <div id={"slider" + rowID} className='flex w-fit h-fit'>
                    {movies.map((movie, id) => (
                        <SmallMovie key={id} pic={movie.poster_path || movie.backdrop_path} title={movie.title || movie.original_name} rating={movie.vote_average} runningTime='' movieID={movie.id} mediaType={movie.media_type}/>
                        ))}
                {/* <FaCaretRight 
                        className='absolute right-0 w-5 h-full bg-[rgba(0,0,0,0.6)] z-[20]'
                        onClick={moveRight}/> */}
                </div>
            </div>

        </div>
    )
}

export default Rows