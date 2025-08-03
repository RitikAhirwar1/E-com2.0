const express = require("express")
const { addProduct, removeProduct, listProduct, singleProduct } = require("../controllers/productController.js");
const upload = require("../middleware/multer.js");
const adminAuth = require("../middleware/adminAuth.js");

const productRoute = express.Router();

productRoute.post("/add",adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct)
productRoute.post("/remove",adminAuth,removeProduct)
productRoute.get('/list',listProduct)
productRoute.get('/single/:id',singleProduct)


module.exports = productRoute;