import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"







export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        loader :false,
        userInfo : '',
        errorMessage: '' ,
        successMessage: '',
      latest_product: [],
    },
    reducers : {
      messageClear: (state, _) =>{
        state.errorMessage=''
        state.successMessage=''
      }



    },
    extraReducers: (builder) => {
        // builder
        
    }
})
export const {messageClear}= authReducer.actions
export default authReducer.reducer