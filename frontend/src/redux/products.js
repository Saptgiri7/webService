import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../api/config";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async(_,{rejectWithValue}) => {
        try{
            const response = await axios.get(API.PRODUCTS.GET_PRODUCTS);
            return response.data;
        } catch(error){
            return rejectWithValue(error.response?.data?.message || "failed to fetch products try agian later")
        }
    }
)


const initialState = {
    products : [],
    status : "idle",
    error : null
}


const productSlice = createSlice({
    name : "products",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder
            .addCase(fetchProducts.pending,(state)=>{
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled , (state,action)=>{
                state.status = "succeeded";
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state,action)=>{
                state.status = "failed";
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;

