import File from "../models/model.js"
import CustomError from "../helpers/customError.js";

const getAllFiles = async(req,res) =>{

    try {


        const files = await File.find();
        
        
        return res.status(200).json({
            success:true,
            data:files
        })

    } catch (error) {
        new CustomError("couldn't get files", 500)
    }
    
}

export default getAllFiles;