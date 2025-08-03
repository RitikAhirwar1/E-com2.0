import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import Collection from '../Pages/Collection' 
import Cart from '../Pages/Cart'
import Login from '../Pages/Login'
import Product from '../Pages/Product'
import PlaceOrder from '../Pages/PlaceOrder.jsx'
import Orders from '../Pages/Orders'
import Verify from '../Pages/Verify'


const Allroutes = () => {
  return (
    
 <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/order' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />

      </Routes>

    
  )
}

export default Allroutes