class CustomError extends Error{

    constructor(message, statuscode){

        super(message);

        this.statuscode = statuscode;
    }
}

export default CustomError;