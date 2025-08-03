const express = require('express')
const {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} = require('../controllers/orderController.js')
const adminAuth = require('../middleware/adminAuth.js')
const userAuth = require('../middleware/userAuth.js')

const orderRoute = express.Router()

//Admin features
orderRoute.post('/list',adminAuth,allOrders)
orderRoute.post('/status',adminAuth,updateStatus)

//payment Features
orderRoute.post('/place',userAuth,placeOrder)  //COD
orderRoute.post('/stripe',userAuth,placeOrderStripe)  //Stripe
orderRoute.post('/razorpay',userAuth,placeOrderRazorpay)  //RazorPay

//User order list feature
orderRoute.post('/userorders',userAuth,userOrders)
 

//Verify  payment
orderRoute.post('/verifyStripe',userAuth,verifyStripe)
orderRoute.post('/verifyRazorpay',userAuth,verifyRazorpay)




module.exports = orderRoute

