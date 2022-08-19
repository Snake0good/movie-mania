import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

const API_KEY = process.env.REACT_APP_API_KEY


function Watching() {
    const location = useLocation()
    const movieID = location.state.movieID
    const mediaType = location.state.mediaType
    const [theVideo, setTheVideo] = useState([])
    
    let videoURL =  `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`

    // get the correct URLS
    if (mediaType === 'tv') {
        videoURL = `https://api.themoviedb.org/3/tv/${movieID}/videos?api_key=${API_KEY}&language=en-US`
    } else {
        videoURL =  `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`
    }


    useEffect(() => {
        fetch(videoURL) 
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                data.results.length > 0 ? setTheVideo(data.results[0]) : setTheVideo(data.results)
            })
    }, [])

    
    return (
        <div className='h-screen w-screen bg-slate-900'>
            <div className='w-full absolute'>
                <a 
                    href="/" 
                    className='bg-slate-900 inline-flex place-items-center p-2 pr-5 pl-5 m-3 border-2 border-white rounded-lg text-white'>
                    <FaArrowLeft className='mr-3'/> 
                    HOME
                </a>
            </div>
                <iframe 
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${theVideo.key}`}
                    frameBorder="0"
                    autoPlay={"autoplay"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"        
                />
        </div>
    )
}

export default Watching