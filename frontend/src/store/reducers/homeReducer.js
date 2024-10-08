import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"



export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categories : [],
    },
    reducers : {

    },
    extraReducers: (builder) => {


    }
})

export default homeReducer.reducer
