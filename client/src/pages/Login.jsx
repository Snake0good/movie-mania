import { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import logo from '../images/logo.png'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errMessage, setErrMessage] = useState('')


  const navigate = useNavigate()

  const { email, password } = formData

  const onChange = (e) => {
    setErrMessage('')
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    console.log('logged in')
    e.preventDefault()

    const userData = {
      email, 
      password
    }
    
    try {
      const url = "/login"
      // const url = "http://localhost:5001/login"
      // const url = "https://movie-mania-app-54321.herokuapp.com/login"
      
      // await axios.post(url, userData)
      //   .then(localStorage.setItem("user", userData.email))
      //   .then(navigate("/"))

        // this should await a post and then check for errors
      await axios.post(url, userData)
      .then(function (response) {
        console.log(response) 
        localStorage.setItem("user", userData.email)
        navigate('/')
      })

    } catch(err) {
      console.log('error man')
      setErrMessage('Error: Unknown account or incorrect password')
    }
  }

  return (
    <>
      <div className="bg-slate-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Welcome! Please Login</h2>
          </div>
          <form 
            onSubmit={onSubmit}
            className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-6">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <div 
                  className='text-red-500 h-6'>
                    {errMessage ? errMessage : ''}
                </div>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div 
                  className='text-red-500 h-6'>
                    {errMessage ? errMessage : ''}
                </div>
              </div>
            </div>

            <div className="flex place-items-center justify-between">
              <div className="text-sm">
                <Link 
                  to="/signup" 
                  className="font-medium text-slate-600 hover:text-slate-500">
                  Not a member? <span className='text-indigo-300'>Sign up here.</span>
                </Link>
              </div>
            </div>

            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-slate-500 group-hover:text-slate-400" aria-hidden="true" />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login