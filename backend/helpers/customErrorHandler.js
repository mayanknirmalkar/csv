

const customErrorHandler = (err,req, res, next)=>{

    console.log("Custom Error Handler =>", err.name, err.message, err.statusCode);

    return res.status(err.statusCode || 500).json({
        success:false, 
        error : err.message || "Server.error"
    })
}

export default customErrorHandler;