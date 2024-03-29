import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../images/logo.png'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const local = localStorage.getItem("user")
  const userName = local ? `Hi ${local.substring(0, local.indexOf('@'))}` : null
  
  const nameMenu = local ? null : "Signup / Login"

  
  // the logout function
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem('user')
    navigate("/")
  }

  const navigation = [
    { name: 'Home', to: '/', current: false },
    { name: 'TV Shows', to: '/tvSearch', current: false },
    { name: 'Movies', to: '/movieSearch', current: false },
    // { name: 'My List', to: '/mylinks', current: false },
    { name: nameMenu, to: '/signup', current: false}
    ]

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={logo}
                    alt="Movie Mania"
                  />
                  <div className='place-items-center hidden lg:flex'>
                    <img
                        className="hidden lg:block h-8 w-auto"
                        src={logo}
                        alt="Movie Mania"
                    />
                    <h1 className='text-2xl'>MovieMania</h1>
                  </div>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                { userName ? <h1 className='ml-12 mr-5'>{userName}</h1> : '' }
                
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  { local ?
                      <h1 
                      className='text-xl font-bold mr-6 cursor-pointer hover:underline'
                      onClick={() => logout()}>
                        Logout
                      </h1>
                    : null }

                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                    <span className="sr-only">Search</span>
                    <Link to='/search'>
                      <FaSearch className="h-6 w-6" aria-hidden="true"/>
                    </Link>
                  
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link to={item.to}>
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}