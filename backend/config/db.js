const mongoose = require('mongoose');

const connectDB = async function(url){
    return mongoose.connect(url);
}


module.exports = connectDB;