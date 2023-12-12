import fs from "fs";
import File from "../models/model.js"

const deleteFile = async (req,res) =>{

   try {

      const _id = req.params.id;

      const doc = await File.findById(_id);

      fs.unlinkSync(doc.filepath)

     await File.deleteOne({_id})

     return res.json({
      success:true,
      message:"deleted"
     })

   } catch (error) {
      console.log(error + "inside delete")
   }  

   
    
}

export default deleteFile;