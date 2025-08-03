import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl} from '../App'
import {toast} from 'react-toastify'
import { assets } from '../assets/assets'
import { currency } from '../App'
// Remove express import as it's not needed in frontend code

const Orders = ({token}) => {

  const [orderList,setOrderList] = useState([])

  const fetchAllOrders = async()=>{
     if(!token){
        return null
      }
    try {
      const response = await axios.post(backendUrl + '/api/order/list',{},{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        setOrderList(response.data.orders.reverse())
      }else{
        // console.log(response.data.msg)
        toast.error(response.data.msg)
      }
     
    } catch (error) {
      console.log(error)
        toast.error(error.message)
      
    }
  }

  const statusHandler = async(event,orderId)=>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      console.log(response.data)
      if(response.data.success){
        await fetchAllOrders()

      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.msg)
      
    }
  }
  useEffect(()=>{
fetchAllOrders()
  },[token])

  return (
    <div>
      <h2>Order Page</h2>
      <div>
        {
          orderList && orderList.length > 0 ? orderList.map((order,index)=>(
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xl sm:text-sm text-gray-700' key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <div>
              {
                order.items && order.items.length > 0 ? order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span> </p>

                  }else{
                        return <p className='py-0.5' key={index}>{item.name} X {item.quantity} <span>{item.size}</span>, </p>
                  }

                }) : <p className='py-0.5'>No items</p>
              }
              </div>
              <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + "," + order.address.state + ", "+ order.address.country}</p>
              </div>
              <p>{order.address.phone}</p>

            </div>
            <div>
              <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
              <p className='mt-3'>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done":"Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
              <option value="OrderPlaced">OrderPlaced</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivery">Delivery</option>
            </select>
            </div>
            </div>

          )) : <p className="text-center py-4">No orders found</p>
        }
      </div>
    </div>
  )
}

export default Orders