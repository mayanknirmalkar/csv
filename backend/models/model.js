import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({

    filename:{
        type:String,
        unique:true,
        required:true
    },

    filepath:{
        type:String,
    },

    filetype:{
        type:String,
        default:'text/csv'
    },

    fileData: {
        type: String,
        required:true
    }
},{timestamps:true})

const File = mongoose.model('File',fileSchema);

export default File;