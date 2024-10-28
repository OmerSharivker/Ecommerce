import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_product= createAsyncThunk(
    'product/add_product',
    async (product,{rejectWithValue, fulfillWithValue})=>{
    
        try{
 
       
            const {data} = await api.post('/product-add',product ,{withCredentials: true});
        //    console.log(data)
            return fulfillWithValue(data)
        }catch(error){
          
            return rejectWithValue(error.response.data);       
    }
}
)


export const get_products= createAsyncThunk(
    'product/get_products',
    async ({parPage,page,searchValue},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            
            const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, {withCredentials: true});
           //console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)

//end method


export const get_product= createAsyncThunk(
    'product/get_product',
    async (productId,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            
            const {data} = await api.get(`/product-get/${productId}`, {withCredentials: true});
     
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)

//end method


export const update_product= createAsyncThunk(
    'product/update_product',
    async (product,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            
            const {data} = await api.post('/product-update',product, {withCredentials: true});
     
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)

//end method

export const product_image_update= createAsyncThunk(
    'product/product_image_update',
    async ({oldImage,newImage,productId},{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const formData= new FormData()
            formData.append('oldImage',oldImage)
            formData.append('newImage',newImage)
            formData.append('productId',productId)
            const {data} = await api.post('/product-image-update',formData, {withCredentials: true});
          
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
export const delete_product= createAsyncThunk(
    'product/delete_product',
    async (productId,{rejectWithValue, fulfillWithValue})=>{
    
        try{
   
            const {data} = await api.delete(`/delete-product/${productId}`, {withCredentials: true});
          
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
export const get_discount_products= createAsyncThunk(
    'product/get_discount_products',
    async (_,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.get(`/discount-product`, {withCredentials: true});
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)
export const zero_discount= createAsyncThunk(
    'product/zero_discount',
    async (productId,{rejectWithValue, fulfillWithValue})=>{
    
        try{
            const {data} = await api.put(`/zero-discount`,{productId} ,{withCredentials: true});
            return fulfillWithValue(data)
        }catch(error){
            return rejectWithValue(error.response.data);       
    }
}
)

export const productReducer = createSlice({
    name: 'product',
    initialState:{
        successMessage :  '',
        errorMessage : '',
        loader: false,
        products : [],
        discountProducts: [],
        product: '',
        totalProduct: 0
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_product.pending, (state, { payload }) => {
            state.loader = true;
        }) 

        .addCase(add_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
      
        .addCase(add_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.successMessage =payload.message;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.totalProduct = payload.totalProduct;
            state.products = payload.products
        })
        .addCase(get_product.fulfilled, (state, { payload }) => {
            state.product = payload.product;
        })
        .addCase(update_product.pending, (state, { payload }) => {
            state.loader = true;
        }) 

        .addCase(update_product.rejected, (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error
        }) 
      
        .addCase(update_product.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.product=payload.product
            state.successMessage =payload.message;
        })
        .addCase(product_image_update.fulfilled, (state, { payload }) => {
            state.product=payload.product
            state.successMessage =payload.message;
        })
        .addCase(delete_product.fulfilled, (state, { payload }) => {
            state.products=payload.products
            state.successMessage =payload.message;
        })
        .addCase(delete_product.rejected, (state, { payload }) => {
            state.errorMessage = payload.error
        }) 
        .addCase(get_discount_products.fulfilled, (state, { payload }) => {
            state.discountProducts=payload.discountProducts
        })
        .addCase(zero_discount.rejected, (state, { payload }) => {
            state.errorMessage = payload.error
        }) 
        .addCase(zero_discount.fulfilled, (state, { payload }) => {
            state.discountProducts=payload.discountProducts
            state.successMessage =payload.message;
        })
    }

})
export const{messageClear}=productReducer.actions;
export default productReducer.reducer;