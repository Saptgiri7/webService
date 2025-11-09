const { StatusCodes } = require("http-status-codes");
const customError = require("./customError");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const authorize = async(req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new customError(StatusCodes.BAD_GATEWAY,'please provide valid json token');
    }

    const token = authHeader.split(' ')[1];
    
    const payload = jwt.verify(token,process.env.JWT_KEY);

    req.body = {
        ...req.body,
        id:payload.id,
    }    

    next();
}

module.exports = authorize;