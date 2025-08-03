import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
const {getCartCount,showSearch,setShowSearch,token,setToken,navigate,setCartItems} =useContext(ShopContext)
 const logOut = ()=>{
  localStorage.removeItem('token')
  setToken('')
  setCartItems({})
  navigate('/login')
 }

  const Links = [
    { path: "/", title: "Home" },
    { path: "/collection", title: "Collection" },
    { path: "/about", title: "About" },
    { path: "/contact", title: "Contact" }
  ]
  return (
    <div className='relative flex items-center justify-between py-5 font-medium'>
      <img src={assets.logo} alt="" className='w-36' />

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700' >
        {
          Links.map((Link) => (
            <NavLink className='flex flex-col items-center gap-1' key={Link.path} to={Link.path} >{Link.title} <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' /></NavLink>
          ))
        }

      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(!showSearch)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>
          <img onClick={()=>token?null:navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt=""  />
          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/order')} className='cursor-pointer hover:text-black'>Order</p>
              <p onClick={logOut} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className='relative'>
          <img src={assets.cart_icon} className='w-5 cursor-pointer' alt="" />
          <p className='absolute right-[-3px] top-[-10px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
        </Link>
        <img onClick={() =>setVisible(!visible)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* Sidebar menu div for samll screen:-it is not visible on desktop screen but visioble for mobile screen */}

      {/* since this is dynamic so classname is also dynamic  */}
      <div className={`absolute top-0 h-screen right-0 border-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(!visible)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='cursor-pointer h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
{
  Links.map((Link)=>(
    <NavLink onClick={()=>setVisible(!visible)} className='py-2 pl-6 border' key={Link.path} to={Link.path}>{Link.title}</NavLink>
  ))
}

        </div>
      </div>


    </div>
  )
}

export default Navbar