import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Actor from '../components/Actor'
import Footer from '../components/Footer'
import HomeButton from '../components/HomeButton'
import Navbar from '../components/Navbar'

function MovieInfo() {
    const location = useLocation();
    const movieID = location.state.movieID
    const mediaType = location.state.mediaType

    console.log('this page does not work')
    console.log(movieID)   
    console.log('mediaType: ', mediaType) 
    const API_KEY = '60e1cf29566133f8db1d2b4c631cbf37'

    let infoURL = ''
    let videoURL = ''
    let creditsURL = ''

    // get the correct URLS
    if (mediaType === 'tv') {
        infoURL = `https://api.themoviedb.org/3/tv/${movieID}?api_key=${API_KEY}&language=en-US`
        videoURL = `https://api.themoviedb.org/3/tv/${movieID}/videos?api_key=${API_KEY}&language=en-US`
        creditsURL = `https://api.themoviedb.org/3/tv/${movieID}/credits?api_key=${API_KEY}&language=en-US`
        console.log('media = tv')
    } else {
        infoURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
        videoURL =  `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`
        creditsURL = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`
        console.log('media = movie')
    }


    // this gets the info, pics, and backdrop
    const [theMovie, setTheMovie] = useState([])
    useEffect(() => {
        fetch(infoURL) 
        .then(response => response.json())
        .then(data => {
            console.log('data ', data)
            setTheMovie(data)
        })
    }, [])


    // this gets the video information to display from Youtube
    const [theVideo, setTheVideo] = useState([])
    useEffect(() => {
        fetch(videoURL) 
        .then(response => response.json())
        .then(data => {
            console.log('data.results', data.results)
            data.results.length === 0 ? setTheVideo('noVideo') : setTheVideo(data.results[0])
        })
    }, [])
    
    
    // this gets the CREDITS information to display
    const [theCast, setTheCast] = useState([])
    useEffect(async () => {
        await fetch(creditsURL) 
        .then(response => response.json())
        .then(data => {
            console.log('credits', data)
            setTheCast(data.cast)
        })
    }, [])
    




    return (
        <div className='bg-slate-900 text-white'>
            <Navbar />
            <HomeButton />

            <h1 className='w-full h-fit text-5xl text-center'>{theMovie.name || theMovie.title}</h1>
            
            <section className='w-full flex flex-col md:flex-row p-5 flex-start justify-center place-items-start'>
                <img className='w-full md:w-96 object-contain' src={`https://image.tmdb.org/t/p/w500/${theMovie.poster_path}`}  />
                <div className='w-full md:w-1/2 flex flex-wrap justify-center'>
                    <p className='text-xl p-5'>{ theMovie.overview }</p>

                    {theCast.map((actor, id) =>  
                        id < 8 && <Actor name={actor.name} character={actor.character} pic={actor.profile_path}/>             
                    )}
                </div>
            </section>


            <div className='h-screen w-screen bg-slate-900 p-10'>            
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


            <Footer />
        </div>
    )
}

export default MovieInfo