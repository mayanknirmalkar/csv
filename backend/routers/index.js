import express from "express";
import fileUploader from "../controllers/uploadController.js";
import readController from "../controllers/csvReadController.js";
import fileUpload from "../middlewares/fileUploadMiddleware.js"
import getAllFiles from "../controllers/getAllFilesController.js"
import deleteFile from "../helpers/deleteFile.js";


const router = express.Router();

router.get('/getuploads', getAllFiles)

router.post('/upload', fileUpload.single('csv'), fileUploader)

router.get('/read/:id', readController)

router.get(`/delete/:id`, deleteFile)

export default router;