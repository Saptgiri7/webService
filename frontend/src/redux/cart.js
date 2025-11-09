
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../api/config";



export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async(payload,{rejectWithValue}) =>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await axios.get(API.CART.URL,{
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'failed to fetch cart')
        }
    }
)


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async(payload,{rejectWithValue}) =>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));            

            const response = await axios.post(API.CART.URL,{product:payload},{headers : {Authorization : `Bearer ${token}`}});
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'failed to add in cart')
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async(payload,{rejectWithValue})=>{
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const response = await axios.delete(API.CART.URL,{
                data : {product : payload},
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'failed to remove')
        }
    }
)

const checkJwtExpiry = () =>{
    const token = localStorage.getItem('token');
    if(!token){
        return false
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const payLoad = JSON.parse(window.atob(base64))

    if(payLoad.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return false;
    }else{
        return true;
    }
}

const isLoggedIn = checkJwtExpiry();

if(!isLoggedIn && !localStorage.getItem('guestCart')){
    localStorage.setItem('guestCart',JSON.stringify([]))
}

const initialState = {
    isLoggedIn,
    items : [],
    status : "idle",
    error : null
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers :{
        loginIndicator : (state) =>{
            localStorage.removeItem('guestCart')
            state.isLoggedIn = true;
        },
        logoutIndicator : (state) =>{
            localStorage.removeItem('token');
            if(!(localStorage.getItem('guestCart'))){
                localStorage.setItem('guestCart',JSON.stringify([]))
            }
            state.isLoggedIn = false;
        }
    },
    extraReducers : (builder) =>{
        builder
            .addCase(fetchCart.pending , (state)=>{
                state.status = 'loading';   
            })
            .addCase(fetchCart.fulfilled, (state,action)=>{
                state.items = action.payload;
                state.status = 'succeeded'; 
            })
            .addCase(fetchCart.rejected,(state,action)=>{
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(addToCart.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(addToCart.fulfilled,(state,action)=>{
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addToCart.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.payload
            })
            .addCase(removeFromCart.pending,(state)=>{
                state.status = 'loading';
            })
            .addCase(removeFromCart.fulfilled,(state,action)=>{
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(removeFromCart.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const {loginIndicator,logoutIndicator} = cartSlice.actions;

export default cartSlice.reducer;