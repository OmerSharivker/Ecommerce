import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"



export const get_dashboard_index_data =createAsyncThunk(
 'dashboard/get_dashboard_index_data',
 async(userId,{rejectWithValue, fulfillWithValue}) =>{
    try {
        const {data} =await api.get(`/home/customer/get-dashboard-data/${userId}`);
       return fulfillWithValue(data);  
    } catch (error) {
        rejectWithValue(error.response)    
    }
 }
)
//end method



export const dashBoardReducer = createSlice({
    name: 'dashboard',
    initialState:{
        errorMessage : '',
        successMessage: '', 
        recentOrders: [],
        totalOrders: 0,
        pendingOrders: 0,
        canceledOrders:0,
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(get_dashboard_index_data.fulfilled, (state, { payload }) => { 
            state.recentOrders=payload.recentOrders;
            state.totalOrders=payload.totalOrders;
            state.canceledOrders=payload.canceledOrders;
            state.pendingOrders=payload.pendingOrders; 
        })
    }
})
export const {messageClear} = dashBoardReducer.actions
export default dashBoardReducer.reducer
