import React from 'react'

const ConnectBox = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <h1 className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</h1>
        <p className=' mt-3 text-medium sm:text-sm md:text-base text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, deleniti!</p>
        <form className='w-full sm-:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-5'>
            <input className='w-full sm:flex-1 outline-none' type="text" placeholder='Enter your email id...'/>
            <button onClick={onSubmitHandler} className='bg-black text-white text-xs px-10 py-4 hover:text-red-400 cursor-pointer'>SUBSCRIBE</button>

        </form>
    </div>
  )
}

export default ConnectBox