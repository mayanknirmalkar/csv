import multer from "multer";
import CustomError from "../helpers/customError.js"





const storage = multer.diskStorage({

    destination:function(req,file,cb){

        req.folderName = "public";
        cb(null, "public")
    },

    filename:function(req,file,cb){

        const filename = new Date().toISOString().replace(/:/g, "-") + file.originalname;

        req.fileName =  filename;

        cb(null, filename);
    }
})


const Filter = (req,file,cb) => {

    
    if(!file.originalname.endsWith('.csv')){
         cb(new CustomError("Please provide a valid csv file", 400), false)
    }else{
        cb(null, true);
    }

    
}

const fileUpload = multer({storage:storage,fileFilter:Filter})

export default fileUpload;