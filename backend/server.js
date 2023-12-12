import express from "express";
import router from "./routers/index.js";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./helpers/db.js";
import customErrorHandler from "./helpers/customErrorHandler.js";
import path from"path";


dotenv.config();

const server = express();

connectDB();

server.use(cors())

server.use(express.json());

server.use(express.urlencoded({extended:true}));

server.use(express.static("./public"))

server.use("/", router)

server.use(customErrorHandler)

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`server on ${PORT}`)
})