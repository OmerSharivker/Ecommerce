import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../api/api"



export const place_order =createAsyncThunk(
 'order/place_order',
 async({ price,products,items,shipping_fee,shippingInfo,userId,navigate }) =>{
    try {
        const {data}= await api.post('/home/order/place-order',{
            price,products,items,shipping_fee,shippingInfo,userId,navigate
        })
        //console.log(data)
        navigate('/payment',{
            state:{
                price:price+shipping_fee,
                items,
                orderId:data.orderId
            }
        })
    } catch (error) {
        console.log(error.response)
    }
 }
)
//end method




export const orderReducer = createSlice({
    name: 'order',
    initialState:{
      myOrders: [],
      errorMessage: '',
      successMessage: '',
      myOrder: {},
      
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
      
    }
})

export default orderReducer.reducer
