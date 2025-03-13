import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {BiUserCircle } from 'react-icons/bi'
import { IoSearch } from 'react-icons/io5'
import { navigation } from '../constant/navigation'
  
const Header = () => {
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput,setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()


  

  useEffect(()=>{
    if(searchInput){

      navigate(`/search?q=${searchInput}`)
    }
  },[searchInput])

  const  handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container mx-auto px-3 flex items-center h-full'>
          <Link to='/'>
            <img 
              src={logo}
              alt='logo'
              width={70}
              className='rounded-md'
            />
          </Link>
          <nav className='hidden md:flex items-center gap-1 ml-5'>
            {
              navigation.map((nav,index)=> {
                return(
                  <div key={index}>
                    <NavLink to={nav.href} className={({isActive})=> `px-2 hover:text-neutral-100 ${isActive && "primary"}`}>
                      {nav.label}
                    </NavLink>
                  </div>
                )
              })
            }
          </nav>

          <div className='ml-auto flex items-center gap-4'>
            <form className='flex items-center gap-2' onSubmit={handleSubmit}>
              <input 
                type='text'
                placeholder='Search'
                className='bg-transparent px-4 py-2 outline-none border border-slate-500 rounded-md hidden md:block'
                onChange={(e)=>setSearchInput(e.target.value)}
                value={searchInput}
              />
              <button className='text-2xl text-white'>
                <IoSearch />
              </button>
            </form>

            <div className='w-10 h-10 cursor-pointer active:scale-50 translate-all'>
              <BiUserCircle className='w-full h-full primary'/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Header