import React from 'react'


const PolicyBox = ({image,text1,text2}) => {
  return (
    <div>
        
            <img className='w-12 m-auto mb-5' src={image} alt="" />
            <p className='font-semibold'>{text1}</p>
            <p className='text-gray-400'>{text2}</p>
        
    </div>
  )
}

export default PolicyBox