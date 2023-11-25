const Loan=require('../models/loanModel')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')

const getLoans= asyncHandler( async (req,res)=>{
    const loans=await Loan.find({user:req.user.id})
    res.status(200).json(loans)
})

const postLoans= asyncHandler( async (req,res)=>{
    const user=req.user.id
    
    if(!req.body.amountLeft && !req.body.amountPaid){
        req.body.amountLeft=req.body.amount
    }

    const {loanType,amount,startDate,endDate,amountPaid,amountLeft}=req.body
    if(!loanType){
        res.status(400)
        throw new Error('Enter the required details')
    }

    const newLoan=await Loan.create({
        user,
        loanType,
        amount,
        startDate,
        endDate, 
        amountPaid,
        amountLeft
    })

    res.status(200).json(newLoan)
})

const putLoans= asyncHandler(async (req,res)=>{
    const loan=await Loan.findById(req.params.id)
    if(!loan){
        res.status(400)
        throw new Error('Loan is not found')
    }

    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('User is not found')
    }

    if(loan.user.toString()!==user.id){
        res.status(400)
        throw new Error('You are not authorized')
    }

    const updatedLoan=await Loan.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedLoan)
})

const deleteLoans= asyncHandler(async (req,res)=>{
    const loan=await Loan.findById(req.params.id)
    if(!loan){
        res.status(400)
        throw new Error('Loan is not found')
    }

    const user=await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('User is not found')
    }

    if(loan.user.toString()!==user.id){
        res.status(400)
        throw new Error('You are not authorized')
    }

    await Loan.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

module.exports={
    getLoans,
    postLoans,
    putLoans,
    deleteLoans
}