import File from "../models/model.js";
import path from "path";
import CustomError from "../helpers/customError.js"
import deleteFile from "../helpers/deleteFile.js"

const fileUploader = async (req,res) =>{
   
    try {
        const filepath = path.resolve(req.folderName, req.fileName);

        const filename = req.fileName;
        
        await File.create({filename, filepath})
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