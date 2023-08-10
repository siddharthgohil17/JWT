import mongoose from 'mongoose';

const ConnectDB=async(DATABASE_URL)=>{
    try{
        const DB_OPTIONS={
            dbName:'user'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("connected successfully")
    }
    catch(error){
     console.log(error.message);
    }
}

export default ConnectDB;