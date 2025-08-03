import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  // to list the data 1st we get it from api and store in a state variable

  const [list, setList] = useState([])

  const fetchData = async () => {
    try {
          const response =await axios.get(backendUrl + "/api/product/list")
          if(response.data.success){
            // console.log(response.data)
            setList(response.data.product)
          }else{
            toast.error(response.data.msg)
          }

    } catch (error) {
      console.log(error)
      toast.error(error.message);

    }
  }
  // const handleRemove=(id)=>{
  //   const newList= list.filter((item)=>item._id!==id)
  //   setList(newList);
  // }
  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(backendUrl + '/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.msg)
        await fetchData()
      } 
      else{
        toast.error(response.data.msg)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }
  useEffect(()=>{
    fetchData()
    
  },[])

  return (
    <>
       <p className='mb-2'>All Products List</p>
       <div className='flec flex-col gap2 '>
        {/* **********---List Table Title  */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm:'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* ****--- Product List  */}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <button onClick={()=>removeProduct(item._id)} className='w-20 px-2 py-2 bg-black text-white rounded-xl items-center cursor-pointer'>Remove</button>

            </div>

          ))
        }
       </div>
    </>
  )
}

export default List