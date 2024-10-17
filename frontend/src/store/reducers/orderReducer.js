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


export const get_orders =createAsyncThunk(
    'order/get_orders',
    async({customerId,status},{rejectWithValue, fulfillWithValue}) =>{
       try {
           const {data} =await api.get(`/home/customer/get-orders/${customerId}/${status}`);
          return fulfillWithValue(data);  
       } catch (error) {
           rejectWithValue(error.response)    
       }
    }
   )
   //end method
   

   export const get_order_details =createAsyncThunk(
    'order/get_order_details',
    async(orderId,{rejectWithValue, fulfillWithValue}) =>{
       try {
           const {data} =await api.get(`/home/customer/get-order-details/${orderId}`);
           console.log(data)
          return fulfillWithValue(data);  
       } catch (error) {
           rejectWithValue(error.response)    
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
        builder
        .addCase(get_orders.fulfilled, (state, { payload }) => { 
            state.myOrders=payload.orders;
         
        })
        .addCase(get_order_details.fulfilled, (state, { payload }) => { 
            state.myOrder=payload.order;
         
        })
    }
})

export default orderReducer.reducer
