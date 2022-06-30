import { FaArrowLeft } from 'react-icons/fa'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Search() {
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

            <div className='w-full flex flex-col justify-center'>
              <h1 className='text-5xl text-center mb-10'>What would you like to search?</h1>
             
              <div className='w-full flex'>
                <div className='w-1/2 flex place-items-center justify-center'>
                  <Link to="/movieSearch" className='w-32 h-20 text-3xl rounded-xl bg-slate-800 hover:scale-110 hover:bg-slate-700 flex justify-center place-items-center'>Movies</Link>
                </div>
                <div className='w-1/2 flex place-items-center justify-center'>
                  <Link to="/tvSearch" className='w-32 h-20 text-3xl rounded-xl bg-slate-800 hover:scale-110 hover:bg-slate-700 flex justify-center place-items-center'>TV</Link>
                </div>
              </div>
            </div>


            
           
              
            





            <Footer />
    </div>
  )
}

export default Search