import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-medium'>
        <div>
            <img src={assets.logo} alt="" className='mb-5 w-36'/>
            <p className='w-full md:w-2/3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic modi nam accusamus amet. Repellendus, saepe. Perspiciatis obcaecati corporis ratione error, consequatur culpa. Laudantium optio ipsa facilis distinctio temporibus quisquam aliquam.</p>
        </div>
       
        <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>HOME</li>
            <li>ABOUT US</li>
            <li>DELIVERY</li>
            <li>PRIVACY POLICY</li>
        </ul>
        </div>
        <div >
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-989-884-6262</li>
                <li>Contact@ritikahirwar1020.com</li>
            </ul>
        </div>
    </div>
        <div className='w-full'>
            <hr />
            <p className='py-5 text-sm text-center w-full'>Copyright 2025@ forever.com - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer