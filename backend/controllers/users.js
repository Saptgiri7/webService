const { StatusCodes } = require("http-status-codes");
const customError = require("../middleware/customError");
const User = require("../model/userSchema");

const getUser = async(req,res) =>{
    const {id:userId} = req.body;
    
    if(!userId){
        throw new customError(StatusCodes.UNAUTHORIZED,'please provide a valid user id');
    }
    
    const user = await User.findOne({_id : userId});
    
    if(!user){
        throw new customError(StatusCodes.UNAUTHORIZED,'user not found');
    }

    return res.status(StatusCodes.OK).json(user);
}

const updateUserDetail = async(req,res) =>{
    try {
        const userId = req.body.id;
        const {fieldToBeUpdated} = req.body
        const forbiddenFields = ['role','_id','email'];

        for(const field of forbiddenFields){
            if(field in fieldToBeUpdated){
                throw new customError(StatusCodes.UNAUTHORIZED,`you can't change ${field}`)
            }
        }

        const user = await User.findById(userId);
        
        if(!user){
            throw new customError(StatusCodes.NOT_FOUND,'user not found')
        }

        if(fieldToBeUpdated.newAddress){
            user.addresses.push(fieldToBeUpdated.newAddress);
            delete fieldToBeUpdated.newAddress;
        }

        if(typeof fieldToBeUpdated.addressToDelete === 'number'){
            if(fieldToBeUpdated.addressToDelete >= 0 && fieldToBeUpdated.addressToDelete < user.addresses.length){
                user.addresses.splice(fieldToBeUpdated.addressToDelete,1);
            }else{
                throw new customError(StatusCodes.BAD_REQUEST,'Invalid Request ')
            }
            delete fieldToBeUpdated.addressToDelete
        }

        Object.assign(user,fieldToBeUpdated);

        await user.save();

        const updatedUser = await User.findById(userId);

        res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message : error})
    }

}


module.exports = {
    getUser,updateUserDetail
}