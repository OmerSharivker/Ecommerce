import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"
import {jwtDecode} from 'jwt-decode';



export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/customer/customer-register',info)
            localStorage.setItem('customerToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data.error)
            return  rejectWithValue(error.response.data.error)
        }
    }
)
   //end method

   export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/customer/customer-login',info)
            localStorage.setItem('customerToken',data.token)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response.data.error)
            return  rejectWithValue(error.response.data.error)
        }
    }
)
   //end method

   const decodeToken = (token) => {
    if (token) {
        const userInfo= jwtDecode(token)
        return userInfo;
    } else {
        return null;
    }
   }


   export const authReducer = createSlice({
    name: 'auth',
    initialState:{
        loader : false,
        userInfo : decodeToken(localStorage.getItem('customerToken')),
        errorMessage : '',
        successMessage: '', 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(customer_register.fulfilled, (state, { payload }) => {
            const userInfo=decodeToken(payload.token)
            state.loader = false;
            state.successMessage = payload.message;
            state.userInfo=userInfo
        })
        .addCase(customer_register.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_register.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage=payload;
        })
        .addCase(customer_login.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            const userInfo=decodeToken(payload.token)
            state.userInfo=userInfo
        })
        .addCase(customer_login.pending, (state, { payload }) => {
            state.loader = true;
        })
        .addCase(customer_login.rejected, (state, { payload }) => {
            
            state.loader = false;
            state.errorMessage=payload;
            
        })
    }
})
export const {messageClear} = authReducer.actions
export default authReducer.reducer
