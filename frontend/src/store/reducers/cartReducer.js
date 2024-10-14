import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 
export const add_to_cart = createAsyncThunk(
    'card/add_to_cart',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/home/product/add-to-cart',info) 
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data.error)
        }
    }
)
// End Method 

export const cartReducer = createSlice({
    name: 'cart',
    initialState:{
        card_products : [], 
        card_product_count: 0,
        wishlist_count : 0,
        wishlist: [],
        price: 0, 
        errorMessage : '',
        successMessage: '', 
        shipping_fee: 0,
        outofstock_products : []
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_to_cart.rejected, (state, { payload }) => {
            state.errorMessage = payload; 
        })
        .addCase(add_to_cart.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.card_product_count = state.card_product_count + 1
        })
    }
})
export const {messageClear} = cartReducer.actions
export default cartReducer.reducer