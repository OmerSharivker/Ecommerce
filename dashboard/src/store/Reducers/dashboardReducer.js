import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";



export const get_admin_dashboard_data= createAsyncThunk(
    'dashboard/get_admin_dashboard_data',
    async (_,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data } = await api.get('/dashboard/get-admin-dashboard-data', {withCredentials: true});
           return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);    
        }
}
)
//end method

export const get_seller_dashboard_data= createAsyncThunk(
    'dashboard/get_seller_dashboard_data',
    async (_,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data } = await api.get('/dashboard/get-seller-dashboard-data', {withCredentials: true});
           return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);    
        }
}
)

  
export const dashboardReducer = createSlice({
    name: 'dashboard',
    initialState:{
        totalSale : 0,
        totalOrder : 0,
        totalProducts:0,
       totalPendingOrder: 0,
       totalSeller:0,
       recentOrder: [],
       recentMessage: [],
    },
    reducers : {

    },
    extraReducers: (builder) => {
        builder
        .addCase(get_admin_dashboard_data.fulfilled, (state, { payload }) => {
            state.totalSale = payload.totalSales;
            state.totalOrder = payload.totalOrders
            state.totalProducts = payload.totalProducts
            state.totalSeller = payload.totalSellers
            state.recentOrder=payload.recentOrders
            state.recentMessage=payload.messages
        }) 
        .addCase(get_seller_dashboard_data.fulfilled, (state, { payload }) => {
            state.totalSale = payload.totalSales;
            state.totalOrder = payload.totalOrders
            state.totalProducts = payload.totalProducts
            state.totalPendingOrder = payload.pendingOrder
            state.recentOrder=payload.recentOrders
            state.recentMessage=payload.messages
        }) 
    }

})
export const{messageClear}=dashboardReducer.actions;
export default dashboardReducer.reducer;