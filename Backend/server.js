const dotenv=require('dotenv').config();
const express=require('express');
const PORT=process.env.PORT;
const {errorHandler}=require('./middleware/errorMiddleware.js')
const connectDB=require('./config/db.js')

connectDB()

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/bill',require('./routes/billRoutes.js'))
app.use('/api/loan',require('./routes/loanRoutes.js'))
app.use('/api/user',require('./routes/userRoutes.js'))

app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})