import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"



export const get_category =createAsyncThunk(
 'product/get_category',
 async(_,{rejectWithValue, fulfillWithValue}) =>{
    try {
        const {data} =await api.get('/home/get-categories');
        return fulfillWithValue(data);  
    } catch (error) {
        rejectWithValue(error.response)    
    }
 }
)
//end method




export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categories : [],
    },
    reducers : {

    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categories = payload.categories;
        })

    }
})

export default homeReducer.reducer
