import { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import {useSearchParams} from 'react-router-dom'
const Verify = () => {

    const {navigate,token,setCartItems,backendUrl} = useContext(ShopContext)
    const [searchParams,setSearchParams]  = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')


    const verifyPayment =async()=>{
        try {
            if(!token){
                return null
            } const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success,orderId},{headers:{token}})
            console.log(response.data)
            if(response.data.success){
                setCartItems({})
                navigate('/order')
            }else{
                navigate('/cart')
                toast.error("Payment Failed")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }

    }

    useEffect(()=>{
verifyPayment()
    },[token])
  return (
    <div>Verifying Payment...</div>
  )
}

export default Verify