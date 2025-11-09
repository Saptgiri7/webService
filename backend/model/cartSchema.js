const mongoose = require('mongoose');


const cartProductSchema = mongoose.Schema({
    productId:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
    },
    quantity : {
        type: Number,
        min : 1,
        default : 1
    },
    size : {
        type: String
    },
    price : {
        type : Number
    },
    images: [
        {
            url : {
                type : String,
            },
            isPrimary : {
                type : Boolean,
                default : false
            }
        }
    ]
},{_id:false});



const cartSchema = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'user id required'],
    },
    products:[
        cartProductSchema
    ],
    amount : {
        type : Number,
    }
})


cartSchema.pre('save', function (next){
    if(this.products && this.products.length > 0){
        this.amount = this.products.reduce((total,item)=>
            total + item.quantity * item.price ,0)
    }else{
        this.amount = 0;
    }

    next();
})



module.exports = mongoose.model('Cart',cartSchema);