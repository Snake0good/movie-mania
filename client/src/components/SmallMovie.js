import React, { useState } from 'react'
import { Fa500Px, FaCaretDown, FaInfo, FaPlay, FaPlus, FaThumbsUp } from 'react-icons/fa'
import { Link } from 'react-router-dom';

function SmallMovie({title, desc, pic, rating, runningTime, movieID, mediaType}) {

    function checkPics() {
        if(pic== null) {
          pic = 'https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279'
        } else {
          pic = `https://image.tmdb.org/t/p/w500/${pic}`
        }
      }
    
    checkPics()

    
    return (
        <div className='group w-[150px] h-[200px] md:w-[220px] md:h-[320px] object-center m-1 relative hover:scale-110 ease-in duration-300'>
            <img 
                className='w-full h-full object-cover absolute' 
                src={ pic } 
                alt={title}
            />
            
            <div className='absolute p-2 bg-[rgba(0,0,0,0.7)] text-white invisible group-hover:visible bottom-0 h-18 md:h-24 w-full'>
                <div className='flex text-sm text-slate-400 justify-between pl-1 pr-3'>
                    <div className='flex'>
                        <Link 
                            to='/watching'
                            state={{
                                movieID, 
                                mediaType
                                }}>
                            <FaPlay className='flex place-items-center mr-3 hover:text-green-300 hover:cursor-pointer'/>
                        </Link>
                        <FaThumbsUp className='flex place-items-center mr-3 hover:text-green-300 hover:cursor-pointer'/>
                    </div>
                    <Link 
                        to='/movieInfo'
                        state={{
                            movieID,
                            mediaType
                        }}
                        >
                        <FaInfo 
                            className='text-slate-300 hover:cursor-pointer'
                            />
                    </Link>
                </div>
                
                <h1 className='text-md t'> {title.length > 15 ? `${title.substring(0, 16)}...` : title} </h1>
                <div>
                    <p className='text-sm text-yellow-500'> {rating} </p>
                    <p className='text-sm'> {runningTime} </p>
                </div>
                <p className='text-sm'> { } </p>
            </div>
        </div>
    )
}

export default SmallMovie