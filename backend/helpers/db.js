import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const URI = process.env.URI;

const connectDB = async() =>{
    const connect = await  mongoose.connect(URI);

    console.log("MongoDB Connection Successfully")
}

export default connectDB;