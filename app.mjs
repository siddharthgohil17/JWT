import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import ConnectDB from './config/connectdb.mjs'
import UserRouter from './routes/userRouter.mjs'



const app=express();
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL;

app.use(express.json());//middleware
app.use(cors());


app.use('/api/user',UserRouter);
ConnectDB(DATABASE_URL);


app.listen(port,()=>{
    console.log(`server listening at ${port}`)
})

