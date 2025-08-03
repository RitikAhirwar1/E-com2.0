
const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const Stripe = require('stripe')
const razorpay = require('razorpay')


// Global variable
const currency = 'inr'
const deliveryCharge = 10

//GateWay initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//Placing order using COD method
const placeOrder = async (req, res) => {

    try {
        // userId is already added by userAuth middleware
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save()
        //After place order we need the cardData clear so...
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.send({ success: true, msg: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }
}
//Placing order using Stripe method
const placeOrderStripe = async (req, res) => {
    try {
        // userId is already added by userAuth middleware
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.send({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })

    }

}

// Verify  Stripe payment 

const verifyStripe = async (req, res) => {

    const { orderId, success } = req.body;
    const { userId } = req.body; // userId is already added by userAuth middleware
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.send({ success: true, msg: "Verification Done" })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.send({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}

//Verification of RazorPAy

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
        // userId is already added by userAuth middleware
        const { userId } = req.body

        console.log('Razorpay verification request:', req.body)
        
        // Verify the payment with Razorpay
        try {
            const orderInfo = await razorpayInstance.payments.fetch(razorpay_order_id,razorpay_payment_id)
            console.log('Razorpay payment info:', orderInfo)
            
            if (orderInfo.status === 'captured' || orderInfo.status === 'authorized') {
                // Extract the order ID from the notes or receipt
                const orderId = orderInfo.notes?.orderId || orderInfo.receipt;
                console.log('Looking for order with ID:', orderId);
                const order = await orderModel.findOne({ _id: orderId })
                
                if (order) {
                    // Update order payment status
                    await orderModel.findByIdAndUpdate(order._id, { payment: true })
                    // Clear cart data
                    await userModel.findByIdAndUpdate(userId, { cartData: {} })
                    return res.send({ success: true, msg: "Payment Successful" })
                } else {
                    console.log('Order not found with ID:', orderInfo.order_id)
                    return res.send({ success: false, msg: "Order not found" })
                }
            } else {
                return res.send({ success: false, msg: "Payment verification failed" })
            }
        } catch (fetchError) {
            console.log('Error fetching payment:', fetchError)
            return res.send({ success: false, msg: "Payment verification failed" })
        }
    }
    catch (error) {
        console.log('Razorpay verification error:', error)
        return res.send({ success: false, msg: error.message })
    }
}
//Placing order using Razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        // userId is already added by userAuth middleware
        const { userId, items, amount, address } = req.body;


        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
            notes: {
                orderId: newOrder._id.toString()
            }
        }
        console.log('Creating Razorpay order with options:', options)
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.send({ success: false, msg: error.message })
            }
            return res.send({ success: true, order: order })
        })
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}


// ALL orders DAta for Admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.send({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}
// ALL orders DAta of Perticular user display on frontend
const userOrders = async (req, res) => {
    try {
        const userId = req.body;
        const orders = await orderModel.find(userId)
        res.send({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })

    }

}

//Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.send({ success: true, msg: "Status updated" })
    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}

module.exports = { verifyRazorpay, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe }