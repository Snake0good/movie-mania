import React, { useState, useEffect } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import SmallMovie from './SmallMovie'

function Rows({topTitle, searchTerm, rowID}) {
    const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&page=1`

    const randomPage = () =>  {
        return (Math.ceil(Math.random() * 1))
    }
    if (searchTerm === 'popular') {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    } else if (searchTerm === 'top_rated') {
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    } else if (searchTerm === 'comedy') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=funny&page=${randomPage()}&include_adult=false`
    } else if (searchTerm === 'economics') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=money&page=${randomPage()}&adult=false`
    } else if (searchTerm === 'teen') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=teen&page=${randomPage()}&include_adult=false`
    } else if (searchTerm === 'horror') {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=horror&page=${randomPage()}&include_adult=false`
    }

    const [movies, setMovies] = useState([])

    let num = 0;

    function moveRight() {
        let slider = document.getElementById('slider' + rowID)
        console.log(slider.clientWidth)
        num -= 10
        num < -85 ? num=0 : num=num
        console.log(num)
        slider.style.transform = `translateX(${num}%)`
        console.log('move right')
    }

    function moveLeft() {
        let slider = document.getElementById('slider' + rowID)
        num += 10
        num > 0 ? num=0 : num=num
        console.log(num)
        slider.style.transform = `translateX(${num}%)`
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
        <div className='relative w-full mt-6 overflow-hidden'>
            <h1 className='sticky text-3xl'>{topTitle}</h1>    
            <FaCaretLeft 
                className='absolute text-3xl p-2 left-0 h-full bg-[rgba(0,0,0,0.4)] z-[20] hover:bg-[rgba(0,0,0,0.9)]'
                onClick={moveLeft} />
            <FaCaretRight 
                    className='absolute text-3xl p-2 right-0 h-full bg-[rgba(0,0,0,0.4)] z-[20] hover:bg-[rgba(0,0,0,0.9)]'
                    onClick={moveRight}/>
            <div className='no-scrollbar relative overflow-x-auto overflow-y-hidden'>

                <div id={"slider" + rowID} className='slider flex w-fit h-fit'>
                    {movies.map((movie, id) => (
                        <SmallMovie key={id} pic={movie.poster_path || movie.backdrop_path} title={movie.title || movie.original_name} rating={movie.vote_average} runningTime='' movieID={movie.id} mediaType={movie.media_type}/>
                        ))}
                </div>
            </div>

        </div>
    )
}

export default Rows