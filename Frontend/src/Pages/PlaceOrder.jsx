import React, { useContext, useState } from 'react'

import CartTotal from '../Components/CartTotal'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const{navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)

  const [formData ,setFromData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler =(event)=>{
    const name=event.target.name
    const value=event.target.value

    setFromData(prev=>({...prev,[name]:value}))

  }

// For razorpay

const initPay =(order)=>{
  console.log('Initializing Razorpay with order:', order)
  const options = {
    key :import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name: 'Order Payment',
    description : 'Order Payment',
    order_id : order.id, // Razorpay uses 'id' not '_id'
    handler : async (response)=>{
      console.log(response)
      try {
        const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
        console.log('Razorpay verification response:', data)
        if(data.success){
          setCartItems({})
          navigate('/order')
          toast.success(data.msg || 'Payment successful')
        } else {
          navigate('/cart')
          toast.error(data.msg || 'Payment verification failed')
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message || 'Payment verification failed')
        navigate('/cart')
      }
    }
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}

  const onSubmitHandler =async(e)=>{
 e.preventDefault()
 try {
     let orderItems=[]
// for getting the items 
     for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          const itemInfo = structuredClone(products.find((product)=>product._id===items))
          if(itemInfo){
           itemInfo.size = item
           itemInfo.quantity = cartItems[items][item]
           orderItems.push(itemInfo)
          }
        }
      }
     }
    //  console.log(orderItems);
     const amount =getCartAmount()
    
let orderData = {
  address:formData,
  items:orderItems,
  amount:amount+ delivery_fee
}
console.log(orderData);
 
switch(method){

  //Api Call fro COD 
     case 'cod':

     const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
     console.log(response.data)
     if(response.data.success){
      setCartItems({})
     
      toast.success(response.data.msg)
      navigate('/order')
     }else{
      toast.error(response.data.msg)
     }

     break;
     case 'stripe':

     const responseStripe =await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
   console.log(responseStripe.data)
     if(responseStripe.data.success){
      const {session_url} =responseStripe.data

      window.location.replace(session_url)
     }else{
      toast.error(responseStripe.data.msg)
     }

      break;
      case 'razorpay':
     const responseRazorpay= await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})
     if(responseRazorpay.data.success){
      initPay(responseRazorpay.data.order)
     }else{
      console.log(responseRazorpay.data.msg)
      toast.error(responseRazorpay.data.msg)
     }

        break;

     default:
      
      break;
}

  
 } catch (error) {
  console.log(error)

  
 }

  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* _____--------------left side  */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>

          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
                 {/*-------------- **********Form Start from here----------------  */}

        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3 '>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" placeholder='Zip code' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone}  type="text" placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>
      {/* **********************--------------Form ENDS here -------******** */}

      {/* ----------Right Side  */}
      <div className='mt-8'> required
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />

                           {/* ---------payment--------------------- */}

          <div  className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>

            </div>
          </div>
          {/* **********************----------place Order button------****  */}
           <div className='w-full text-end'>
          <button type='submit'  className='bg-black text-white text-sm my-8 px-8 py-3'>PLACE ORDER</button>
        </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder