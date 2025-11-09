import { configureStore } from "@reduxjs/toolkit";

import productReducer from './redux/products';
import cartReducer from './redux/cart';


const store = configureStore({
    reducer:{
        products : productReducer,
        cart : cartReducer
    }
})


export default store;