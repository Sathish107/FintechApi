const mongoose=require('mongoose')

const billSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    amount:{
        type:Number,
        required:true,
    },
    billType:{
        type:String,
        required:true
    },
    billDate:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Bill',billSchema)