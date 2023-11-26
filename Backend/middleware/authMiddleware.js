const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

const protect=asyncHandler(async (req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1]  
            const decode=await jwt.verify(token,process.env.JWT_SECRET)

            const user=await User.findById(decode.id).select('-password')
             
            req.user=user
        }catch(error){
            if(error.name=="TokenExpiredError"){
                res.status(400)
                throw new Error('Token expired!')
            }

            console.log(error);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(400)
        throw new Error('No token found or not authorized')
    }

    if(!req.user){
        res.status(400)
        throw new Error('user not found in Database')
    }else{
        next()
    }
    
})

module.exports=protect