import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {

  const [state, setState] = useState('Login');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { setToken, navigate, backendUrl,token } = useContext(ShopContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Signup') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
          toast.success(response.data.msg)
        } else {
          toast.error(response.data.msg)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login',{email,password})
        console.log(response.data)
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)

          toast.success(response.data.msg)
        }else{
          toast.error(response.data.msg)
        }

      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }
useEffect(()=>{
if(token){
  navigate('/')
}
},[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{state}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {state === 'Signup' ? <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required /> : <></>}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between'>
        <p>Forgot your password?</p>
        {state === 'Signup' ? <p onClick={() => setState('Login')} className='cursor-pointer'>Login here</p> : <p onClick={() => setState('Signup')} className='cursor-pointer'>Create Account</p>}
      </div>
      <button className='cursor-pointer bg-black text-white font-light px-8 py-2 mt-4'>{state === 'Signup' ? 'Sign Up' : 'Sign In'}</button>


    </form>
  )
}

export default Login