import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({setToken}) => {
   

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)] text-center' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')}  className='bg-gray-600 text-white px-5 rounded-full py-2 sm:px-7 sm:py-2 cursor-pointer'>Loguot</button>

    </div>
  )
}

export default Navbar
//ritikahirwar1020@gmail.com
//R10@20#30