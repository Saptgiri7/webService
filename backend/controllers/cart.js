const customError = require('../middleware/customError');
const Cart = require('../model/cartSchema');
const mongoose = require('mongoose')

const { StatusCodes } = require("http-status-codes");

const getCart = async(req,res) =>{
    try {
        const {id : userId} = req.body;
        const cart = await Cart.findOne({userId});

        res.status(StatusCodes.OK).json([...cart.products])

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error});
    }
}


const removeCartItem = async(req,res) =>{
    try {
        const {id:userId,product} = req.body;
        
        let cart = await Cart.findOne({userId});
        
        const itemToBeDeleted = cart.products.find(
            (cartProduct) => 
                cartProduct.productId.toString() === product.productId &&
                cartProduct.size === product.size
        )
        
        const updateAmount = cart.amount - (itemToBeDeleted.price * itemToBeDeleted.quantity);

        const updatedCart = await Cart.findOneAndUpdate(
            {userId : new mongoose.Types.ObjectId(userId)},
            { 
                $pull: {products : {productId : product.productId}}, 
                $set : {amount : Math.max(updateAmount,0)}
            },
            {new : true}
        );

        cart = await Cart.findOne({userId});
        
        res.status(StatusCodes.OK).json(cart.products);

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: `${error}`});
    }
}


const addCartItem = async(req,res) =>{
    try{
        const {id : userId,product} = req.body
    
        if(!userId || !product){
            throw new customError(StatusCodes.BAD_REQUEST,'Please provide all fields')
        }

        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = await new Cart({userId,amount:0});
        }

        const existingItem = cart.products.find(
            (cartProduct) => 
                cartProduct.productId.toString() === product.productId && 
                cartProduct.size === product.size
            
        )


        if(existingItem){
            existingItem.quantity += product.quantity || 1;
        }else{
            cart.products.push(
                {
                    productId : product.productId,
                    size : product.size,
                    quantity : product.quantity,
                    price : product.price,
                    images : product.images
                }
            );
        }

        cart.amount += product.price * product.quantity;
        await cart.save();

        cart = await Cart.findOne({userId});
        res.status(StatusCodes.OK).json(cart?.products || []);
    }catch(error){
        throw new customError(StatusCodes.INTERNAL_SERVER_ERROR,error);
    }
}




module.exports = {getCart,removeCartItem,addCartItem};