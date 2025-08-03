import React from 'react'
import PolicyBox from './PolicyBox'
import { assets } from '../assets/assets'



const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
  
        <PolicyBox image={assets.exchange_icon} text1={"Easy Exchange Policy"} text2={"We offer hassle free exchange policy"}/>
        <PolicyBox image={assets.quality_icon} text1={"7 Days Return Policy"} text2={"We provide 7 days free return policy"}/>
        <PolicyBox image={assets.support_img} text1={"Best Customer Support"} text2={"We provide 24/7 customer support"}/>
          </div>
  ) 
}

export default Policy