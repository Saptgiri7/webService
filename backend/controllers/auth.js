const { StatusCodes } = require('http-status-codes');
const User = require('../model/userSchema');
const customError = require('../middleware/customError');
const Cart = require('../model/cartSchema')


const registerUser = async(req,res) =>{
    console.log(req.body.userDetails);
    const {email,password} = req.body.userDetails;

    if(!email || !password){
        throw new customError(StatusCodes.BAD_REQUEST,'failed to register please try agian');
    }
    
    const emailExists = await User.findOne({email});
    
    if(emailExists){
        throw new customError(StatusCodes.UNAUTHORIZED,'already registered with this email use different one');
    }

    const user = new User({...(req.body.userDetails)});
    await user.save();
    await user.updateLastLogin();
    const cart = new Cart({userId:user._id,amount : 0});
    await cart.save();
    const token = user.createjwt();

    res.json({token});

}


const loginUser = async(req,res) =>{
    const {email,password} = req.body;
;
    if(!email || !password){
        throw new customError(StatusCodes.BAD_REQUEST,'please provide credentails');
    }

    const user = await User.findOne({email}).select("+password");


    if(!user){
        throw new customError(StatusCodes.UNAUTHORIZED,'user not found!');
    }
    
    const isValidPassword = await user.comparePassword(password);

    
    if(!isValidPassword){
        throw new customError(StatusCodes.UNAUTHORIZED,'invalid password')
    }
    await user.updateLastLogin();

    const token = user.createjwt();

    res.status(StatusCodes.OK).json({token});
}


module.exports = {
    registerUser,
    loginUser,
}