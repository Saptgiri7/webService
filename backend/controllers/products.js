const Product = require('../model/productSchema');
const customError = require('../middleware/customError');

const getAllProducts = async(req,res) =>{

    try{
        const deviceSize = req?.body?.size || "largeDetail";
        
        const projection = {
            _id : 1,
            productName : 1,
            price : 1,
            sizes : 1,
            rating : 1,
            inStock : 1,
            description : 1,
            details : 1,
            category : 1,
            [`images.${deviceSize}`] : 1
        }

        const products = await Product.find({},projection)
        res.status(200).json([...products]);
    }
    catch(error){
        res.status(500).json({message : error});
    }

}

const getSingleProduct = async(req,res)=>{
    try{
        const id = req.params.id;
        const deviceSize = req.body?.size || "largeDetail";

        if(!id || !deviceSize){
            throw new customError('something went wrong please try agian...');
        }

        const projection = {
            _id : 1,
            productName : 1,
            price : 1,
            sizes : 1,
            rating : 1,
            inStock : 1,
            description : 1,
            details : 1,
            category : 1,
            [`images.${deviceSize}`] : 1
        }

        const product = await Product.findOne({_id:id},projection);

        if(!product){
            res.status(404).json({message: `There is no product with id : ${id}`})
        }

        res.status(200).json(product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error});
    }

}



module.exports = {getAllProducts,getSingleProduct};