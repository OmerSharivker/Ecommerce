import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_admin_orders= createAsyncThunk(
    'orders/get_admin_orders',
    async ({parPage,page,searchValue},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method

export const get_admin_order= createAsyncThunk(
    'orders/get_admin_order',
    async (orderId,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.get(`/admin/order/${orderId}`, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method
export const admin_order_status_update= createAsyncThunk(
    'orders/admin_order_status_update',
    async ({orderId,info},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.put(`/admin/order/update/${orderId}`,info, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method

export const get_seller_orders= createAsyncThunk(
    'orders/get_seller_orders',
    async ({parPage,page,searchValue,sellerId},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.get(`/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method
export const get_seller_order= createAsyncThunk(
    'orders/get_seller_order',
    async ({orderId,sellerId},{rejectWithValue, fulfillWithValue})=>{
       
        try{
            const {data} = await api.get(`/seller/order/${orderId}?sellerId=${sellerId}`, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method
export const seller_order_status_update= createAsyncThunk(
    'orders/seller_order_status_update',
    async ({orderId,info},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.put(`/seller/order/update/${orderId}`,info, {withCredentials: true});
        //  console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
//end method
export const orderReducer = createSlice({
    name: 'order',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        order : {},
        totalOrders: 0,
       myOrders: [],
    },
    reducers : {

      messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
     
        .addCase(get_admin_orders.fulfilled, (state, { payload }) => {
            state.myOrders = payload.orders;
            state.totalOrders = payload.totalOrders
        })
        .addCase(get_admin_order.fulfilled, (state, { payload }) => {
            state.order = payload.order;
           
        })
        .addCase(admin_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
           
        })
        .addCase(admin_order_status_update.rejected, (state, { payload }) => {
            state.errorMessage = payload.message;
           
        })
        .addCase(get_seller_orders.fulfilled, (state, { payload }) => {
            state.myOrders = payload.orders;
            state.totalOrders = payload.totalOrders
        })
        .addCase(get_seller_order.fulfilled, (state, { payload }) => {
            state.order = payload.order;
         
        })
        .addCase(seller_order_status_update.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
           
        })
    }

})
export const{messageClear}=orderReducer.actions;
export default orderReducer.reducer;