import multer from "multer";
import CustomError from "../helpers/customError.js"





const storage = multer.memoryStorage();


const Filter = (req,file,cb) => {

    
    if(!file.originalname.endsWith('.csv')){
         cb(new CustomError("Please provide a valid csv file", 400), false)
    }else{
        cb(null, true);
    }

    
}

const fileUpload = multer({storage:storage, fileFilter:Filter})

export default fileUpload;