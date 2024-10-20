import authReducer  from "./reducers/authReducer";
import  cartReducer  from "./reducers/cartReducer";
import chatReducer  from "./reducers/chatReducer";
import  dashBoardReducer  from "./reducers/dashBoardReducer";
import homeReducer from "./reducers/homeReducer";
import  orderReducer  from "./reducers/orderReducer";


const rootReducer = {
    home : homeReducer,
    auth : authReducer,
    cart : cartReducer,
    order :orderReducer,
    dashboard : dashBoardReducer ,
    chat : chatReducer,
}
export default rootReducer