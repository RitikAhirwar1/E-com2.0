import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import ConnectBox from '../Components/ConnectBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sed suscipit itaque optio pariatur vitae quis, adipisci corporis inventore fugiat similique, commodi sequi reiciendis animi nisi! Quasi dolorum quo architecto?</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, praesentium expedita. Voluptate, sapiente iure. Aliquid, labore nisi. Non natus tenetur debitis voluptate at fuga reprehenderit ipsam totam corporis impedit. Dolorem!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to becomes Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit unde deleniti asperiores ea eaque at ratione numquam consequuntur labore nemo.</p>
        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit est autem beatae officia sed! Lorem ipsum dolor sit amet.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>CONVENIENCE</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit est autem beatae officia sed! Lorem ipsum dolor sit amet.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>EXCEPTIONAL CUSTOMER SERVICE</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit est autem beatae officia sed! Lorem ipsum dolor sit amet.</p>
        </div>

      </div>
      <ConnectBox/>
    </div>
  )
}

export default About