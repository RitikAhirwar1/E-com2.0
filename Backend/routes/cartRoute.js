const express = require('express')
const { addToCart,updateCart,getUserCart } = require('../controllers/cartController')
const userAuth = require('../middleware/userAuth')

const cartRoute =express.Router()

cartRoute.post('/add',userAuth,addToCart)
cartRoute.post('/get',userAuth,getUserCart)
cartRoute.post('/update',userAuth,updateCart)

module.exports =cartRoute;