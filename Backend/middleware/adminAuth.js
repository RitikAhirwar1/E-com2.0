const jwt =require('jsonwebtoken');


const adminAuth =async(req,res,next)=>{

    try {
        const {token} =req.headers
        if(!token){
            return res.send({success:false,msg:"Not authorized login Again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET_KEY)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.send({success:false,msg:"Not authorized login Again"})
        }
        next();

    } catch (error) {
        
    }

}

module.exports =adminAuth;