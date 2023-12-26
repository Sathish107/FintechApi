const asyncHandler=require('express-async-handler')
const Bill=require('../models/billModel')
const User=require('../models/userModel')

const getBills=asyncHandler(async (req,res)=>{
    bills=await Bill.find({user:req.user.id})
    res.status(200).json(bills)
})

const postBills=asyncHandler( async(req,res)=>{
    if(!req.body.amount || !req.body.billType || !req.body.billDate){
        res.status(400)
        throw new Error('please enter the details')
    } 
    const newBIll=await Bill.create({
        user:req.user.id,
        amount:req.body.amount,
        billType:req.body.billType,
        billDate:req.body.billDate
    })

    res.status(200).json(newBIll)
})

const putBills= asyncHandler(async (req,res)=>{ 
    const bill=await Bill.findById(req.params.id); 
    if(!bill){
        res.status(400)
        throw new Error('no bills found')
    }

    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('No such user with that id provided')
    } 

    if(bill.user.toString()!==user.id){
        res.status(400)
        throw new Error("You are not authorized to access this bill")
    }

    const updatedBill=await Bill.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedBill)
})

const deleteBills=asyncHandler(async(req,res)=>{
    const bill=await Bill.findById(req.params.id);
    if(!bill){
        res.status(400)
        throw new error('no bills found')
    }

    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('No such user with that id provided')
    } 

    if(bill.user.toString()!==user.id){
        res.status(400)
        throw new Error("You are not authorized to access this bill")
    }
    await Bill.findByIdAndDelete(req.params.id)

    res.status(200).json({id:req.params.id})
})

module.exports={
    getBills,
    postBills,
    putBills,
    deleteBills,
}