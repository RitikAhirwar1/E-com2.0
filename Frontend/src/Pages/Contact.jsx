import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import ConnectBox from '../Components/ConnectBox'

const Contact = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
              <img className='w-full md:max-w-[450px]' src={assets.contact_img} alt="" />
              <div className='flex flex-col justify-center items-start gap-6'>
                <p className='font-semibold text-xl text-gray-600'>OUR STORE</p>
                <p className='text-gray-500'>45870 MP Nagar Bhopal,Madhaya Pradesh,INDIA <br /></p>
                <p className='text-gray-500'>Tel: (+91) 8450067972 <br /> Email: ritikahirwar1020@gmail.com</p>
                 <p  className='font-semibold text-xl text-gray-600'>CAREERS AT FOREVER</p>
                  <p className='text-gray-500'>Learn more about our teams and job openings</p>
                   <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white'>Explore jobs</button>
              </div>
              
             
            </div>
            <ConnectBox/>
    </div>
  )
}

export default Contact