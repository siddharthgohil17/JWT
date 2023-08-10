import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import ConnectDB from './config/connectdb'

const app=express();
const port=process.env.PORT

app.use(cors());

app.listen(port,()=>{
    console.log(`1server listening at ${port}`)
})
