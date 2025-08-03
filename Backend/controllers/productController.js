const productModel = require("../models/product.model.js")

const cloudinary = require('cloudinary').v2;

// Route to add product
const addProduct=async(req,res)=>{

try {
    console.log("FILES RECEIVED:", req.files);
console.log("BODY RECEIVED:", req.body);

    const{name,description,price,category,subcategory,sizes,bestseller}=req.body

    const image1=req.files.image1 && req.files.image1[0]
    const image2=req.files.image2 && req.files.image2[0]
    const image3=req.files.image3 && req.files.image3[0]
    const image4=req.files.image4 && req.files.image4[0]

    const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)
    let imageUrl =await Promise.all(
        images.map(async (item)=>{
            let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url
        })
    )
    const productData ={
        name,
        description,
        category,
        price:Number(price),
       subcategory,
        bestseller:bestseller==="true"?true:false,
        sizes:JSON.parse(sizes),
        image:imageUrl,
        date:Date.now()
    }

    const product =new productModel(productData)
    await product.save()
    console.log(name,description,price,category,sizes,bestseller);
    console.log(images)
    console.log(imageUrl)
    res.send({success:true,msg:"Product added successfully"})
} catch (error) {
    console.log(error)
    res.send(error.message)
    
}
}
// Route to remove product
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.send({success:true,msg:"Product Deleted Successfully"})
        
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }

}
// Route to get list of product
const listProduct=async(req,res)=>{
try {
   const product= await productModel.find({});
    res.send({success:true,product})
    console.log("get the data")
} catch (error) {
    console.log(error)
    res.send({success:false,msg:error.message})
    
}
}
// Route to single product
const singleProduct=async(req,res)=>{

}

module.exports = {addProduct,removeProduct,listProduct,singleProduct};

