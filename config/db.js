import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Database successfully connected...")

    }catch(err){
        console.log("Database connection is failed", err)
    }
}

export default connectDB;