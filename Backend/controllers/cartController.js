const userModel = require('../models/user.model')
//ADD Products to user Cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)

        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;

        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.send({ success: true, msg: "Added to cart" })

    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })

    }

}
//Update Products to user Cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.send({ success: true, msg: "Cart Data Updated" })


    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}
//get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.send({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.send({ success: false, msg: error.message })
    }

}

module.exports = { addToCart, updateCart, getUserCart }