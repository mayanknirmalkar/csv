import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({

    filename:{
        type:String,
        unique:true,
    },

    filepath:{
        type:String,
    },

    filetype:{
        type:String,
        default:'text/csv'
    }
},{timestamps:true})

const File = mongoose.model('File',fileSchema);

export default File;