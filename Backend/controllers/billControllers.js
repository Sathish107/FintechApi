const asyncHandler=require('express-async-handler')
const Bill=require('../models/billModel')
const User=require('../models/userModel')

const getBills=asyncHandler(async (req,res)=>{
    bills=await Bill.find({user:req.user.id})
    res.status(200).json(bills)
})

const postBills=asyncHandler( async(req,res)=>{
    if(!req.body.amount || !req.body.billType || !req.body.billDate || !req.body.pivot){
        res.status(400)
        throw new Error('please enter the details')
    } 
    const newBIll=await Bill.create({
        pivot:req.body.pivot,
        user:req.user.id,
        amount:req.body.amount,
        billType:req.body.billType,
        billDate:req.body.billDate
    })

    res.status(200).json(newBIll)
})

const putBills= asyncHandler(async (req,res)=>{ 
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('No such user with that id provided')
    } 

    const bill=await Bill.find({pivot:req.params.pivot,user:user.id}); 

    if(!bill[0]){
        res.status(400)
        throw new Error('no bills found')
    }

    if(bill[0].user.toString()!==user.id){
        res.status(400)
        throw new Error("You are not authorized to access this bill")
    }

    const updatedBill=await Bill.findByIdAndUpdate(bill[0].id,req.body,{
        new:true,
    })
    res.status(200).json(updatedBill)
})

const deleteBills=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('No such user with that id provided')
    } 

    const bill=await Bill.find({pivot:req.params.pivot,user:user.id}); 

    if(!bill[0]){
        res.status(400)
        throw new Error('no bills found')
    }

    if(bill[0].user.toString()!==user.id){
        res.status(400)
        throw new Error("You are not authorized to access this bill")
    }
    await Bill.findByIdAndDelete(bill[0].id)

    res.status(200).json({id:bill[0].id})
})

module.exports={
    getBills,
    postBills,
    putBills,
    deleteBills,
}