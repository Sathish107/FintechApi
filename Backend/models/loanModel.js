const mongoose=require('mongoose');

const loanSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    loanType:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    interestRate:{
        type:Number,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    amountPaid:{
        type:Number,
        default:0
    },
    amountLeft:{
        type:Number, 
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Loan',loanSchema)