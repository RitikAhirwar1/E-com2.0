const express = require('express');
const connection = require("./config/db");
const {connectCloudinary} =require('./config/cloudinary.js')
const cors = require('cors');

const userRoute = require('./routes/userRoute.js');
const productRoute = require('./routes/productRoute.js');
const cartRoute = require('./routes/cartRoute.js');
const orderRoute = require('./routes/orderRoute.js');
//  'dotenv/config'
require("dotenv").config();
  
// APP config 
const app = express();
const port = process.env.PORT || 4000
connectCloudinary()                    //use to store images

//Middleware
app.use(express.json())
app.use(cors());

//API end point

app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)

app.get('/', (req, res) => {
    res.send("This is home page")
})



app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to DataBase")
    } catch (error) {
        console.log("Not Connected to DB")
    }
    console.log(`Server is running on port ${port}`)
})