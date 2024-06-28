
import { lazy } from "react";






const Home=lazy(()=> import('../../views/Home'));
const SellerDashboard=lazy(()=> import('../../views/seller/SellerDashboard'));
const AddProduct=lazy(()=> import('../../views/seller/AddProduct'));
const Products=lazy(()=> import('../../views/seller/Products'));
const DiscountProducts = lazy(()=> import('../../views/seller/DiscountProducts')) ;
const Orders=lazy(()=> import('../../views/seller/Orders'));
const Payments=lazy(()=> import('../../views/seller/Payments'));
const SellerChatCustomer=lazy(()=> import('../../views/seller/SellerChatCustomer'));
const SellerChatAdmin=lazy(()=> import('../../views/seller/SellerChatAdmin'));
const Profile=lazy(()=> import('../../views/seller/Profile'));

export const sellerRoutes =[
     {

     path: '/',
     element: <Home/>,
     ability : ['admin',"seller"]

   },
   {

     path: '/seller/dashboard',
     element: <SellerDashboard/>,
     role : 'seller',
     status : 'active'

   },
 
   {

     path: '/seller/dashboard/add-product',
     element: <AddProduct/>,
     role : 'seller',
     status : 'active'

   },
   {

     path: '/seller/dashboard/products',
     element: <Products/>,
     role : 'seller',
     status : 'active'
   },
   {
       path: '/seller/dashboard/discount-product',
       element : <DiscountProducts/>,
       role : 'seller',
     status : 'active'
   },
   {
    path: '/seller/dashboard/orders',
    element : <Orders/>,
    role : 'seller',
    ability : ['active','deactivate']
},
{
  path: '/seller/dashboard/payments',
  element : <Payments/>,
  role : 'seller',
  status : 'active'
},
{
  path: '/seller/dashboard/chat-customer/:customerId',
  element : <SellerChatCustomer/>,
  role : 'seller',
  status : 'active'
},
{
  path: '/seller/dashboard/chat-support',
  element : <SellerChatAdmin/>,
  // role : 'seller',
  ability : ['active','deactivate','pending']
},
{
  path: '/seller/dashboard/chat-customer',
  element : <SellerChatCustomer/>,
  role : 'seller',
  status : 'active'
},
{
  path: '/seller/dashboard/profile',
  element : <Profile/>,
  role : 'seller',
  status : 'active'
},
]