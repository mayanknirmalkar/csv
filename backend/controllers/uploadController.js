import File from "../models/model.js";
import path from "path";
import CustomError from "../helpers/customError.js"
import deleteFile from "../helpers/deleteFile.js"

const fileUploader = async (req,res) =>{
   
    try {
        
        const filename = req.body.title;

        const fileData = req.file.buffer.toString();
        
        await File.create({ fileData, filename })
        
       return res.status(201).json({
            success:true,
            message:"file successfully uploaded!"
        })
    } catch (error) {
        new CustomError("error uploading in database", 500)
        deleteFile(req.filepath)
    }

    
}

export default fileUploader;