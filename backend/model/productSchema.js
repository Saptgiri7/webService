const mongoose = require('mongoose');

const imageVaraintSchema = mongoose.Schema({
    _id : false,
    url : {
        type:String,
    },
    isPrimary : {
        type: Boolean,
        default : false
    }
},{_id:false})


const sizedImages = mongoose.Schema({
    smallGrid : [imageVaraintSchema],
    smallDetail : [imageVaraintSchema],
    mediumGrid : [imageVaraintSchema],
    mediumDetail : [imageVaraintSchema],
    largeGrid : [imageVaraintSchema],
    largeDetail : [imageVaraintSchema],
},{_id:false})


const productSchema = mongoose.Schema({
    productName:{
        type: String,
        required:[true,"please provide a name"]
    },
    price:[
        {
            type: Number,
        }
    ],
    sizes:[
        {
            type: String,
        }
    ],
    images: sizedImages,
    rating:{
        type: Number,
    },
    inStock:{
        type: Boolean,
        default: true,
    },
    description:{
        type: String,
    },
    details:{
        type: String,
    },
    category:{
        type:String,
    }
})


module.exports = mongoose.model(`product`,productSchema);