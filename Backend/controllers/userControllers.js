const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const registerUser= asyncHandler(async (req,res)=>{
    const {userName,email,password}=req.body
    if(!userName || !email || !password){
        res.status(400)
        throw new Error('Enter all fields')
    }

    const userFound=await User.findOne({email})
    if(userFound){
        res.status(400)
        throw new Error('The email has already used!')
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        userName,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            id:user.id,
            email:user.email,
            userName:user.userName,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('unable to create User')
    }
    res.status(200).json({message:"register"})
})

const loginUser= asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    if(!email || !password){
        res.status(400)
        throw new Error('Enter all required fields')
    }

    const user=await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            id:user.id,
            email:user.email,
            userName:user.userName,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('wrong Credentials!')
    }
})

const getUser= asyncHandler(async (req,res)=>{
    const {id,userName,email}=req.user;
    res.status(200).json({
        id:id,
        userName:userName,
        email:email
    })
})

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'3d'})
}

module.exports={
    registerUser,
    loginUser,
    getUser
}