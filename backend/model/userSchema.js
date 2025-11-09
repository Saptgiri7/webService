const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const addressSchema = mongoose.Schema({
    label : {
        type : String,
        default : 'Home',
    },
    fullName : {
        type:  String,
        required : true,
    },
    phoneNumber : {
        type: String,
        required : true,
        match: [/^\d{10}$/,'please provide a valid phone number'],
    },
    country : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    pincode : {
        type : String,
        required : true,
    },
    streetAddress : {
        type : String,
        required : true,
    },
    currentlyUsed : {
        type : Boolean,
        default : false,
    }
},{_id : false})


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,"please provide a name between 3-30 characters"],
        trim:true,
        minlength : 3,
        maxlength : 30,
    },
    email:{
        type: String,
        required:[true,'please provide an email'],
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
    },
    password:{
        type: String,
        required: [true,`please provide a passowrd`],
        minlength: [6,`password must be atleast 6 characters long`],
        select : false,
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default: `user`,
        select : false,
    },
    phoneNumber:{
        type: String,
        match: [/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number'],
    },
    country:{
        type: String,
        default : ""
    },
    addresses:{    
        type: [addressSchema],
        default : []
    },
    lastLogin : {
        type : Date
    }
},{ timestamps : true})


userSchema.pre(`save`,async function(next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})

userSchema.methods.comparePassword = async function(receivedPassword){
    const isMatch = await bcrypt.compare(receivedPassword,this.password);
    return isMatch;
}

userSchema.methods.createjwt = function(){
    return jwt.sign({id: this._id},process.env.JWT_KEY,{expiresIn: process.env.JWT_LIFETIME});
}

userSchema.methods.updateLastLogin = async function() {
    this.lastLogin = new Date();
    await this.save({validateBeforeSave : false})
}

module.exports = mongoose.model("User",userSchema);