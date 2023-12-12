import fs, { read } from "fs";
import File from "../models/model.js"
import CustomError from "../helpers/customError.js"
import {parse} from "csv-parse/sync"
import util from "util"

const readController = async (req,res) =>{

    const readFileAsync = util.promisify(fs.readFile)

    const _id = req.params.id;

    try {
        const file = await File.findById(_id);

        const filepath = file.filepath;

        const data = await readFileAsync(filepath, "utf-8"); 
            

        const records = parse(data, {
            columns: true,
            skip_empty_lines: true
        })       

       return res.status(200).json({
            success:true,
            data:records
        })

    } catch (error) {

       throw new CustomError("error reading file", 500)

    }

   
    
}

export default readController;