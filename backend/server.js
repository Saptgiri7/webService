const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const domain = `pengondakalyanifoods`;
const authRoutes = require(`./routes/authRoute`);
const productsRoutes = require('./routes/productsRoute');
const cartroutes = require('./routes/cartRoute');
const userSettingsRoutes = require('./routes/userRoute');
const errorHandleMiddler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const authorize = require('./middleware/authMiddleware');
const cors = require('cors')
require('dotenv').config();
const helmet = require('helmet');
const xss = require('xss-clean');

app.use(express.json());
app.use(cors());
app.use(`/${domain}/user`,authRoutes)
app.use(`/${domain}/products`,productsRoutes);
app.use(`/${domain}/cart`,authorize,cartroutes);
app.use(`/${domain}/user/settings`,authorize,userSettingsRoutes)
app.use(errorHandleMiddler);


const start = async()=>{
    try{
        await connectDB(process.env.DATABASE_URL);
        app.listen(PORT,()=>{
            console.log('server working');
        })
    }catch(error){
        console.log(error);
    }
}

start();
