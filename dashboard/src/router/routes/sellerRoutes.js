import { lazy } from "react";

const SellerDashboard=lazy(()=> import('../../views/seller/SellerDashboard'));
const AddProduct=lazy(()=> import('../../views/seller/AddProduct'));
const Products=lazy(()=> import('../../views/seller/Products'));
const DiscountProducts = lazy(()=> import('../../views/seller/DiscountProducts')) ;
const Orders=lazy(()=> import('../../views/seller/Orders'));
const Payments=lazy(()=> import('../../views/seller/Payments'));
const SellerChatCustomer=lazy(()=> import('../../views/seller/SellerChatCustomer'));
const SellerChatAdmin=lazy(()=> import('../../views/seller/SellerChatAdmin'));
const Profile=lazy(()=> import('../../views/seller/Profile'));
const EditProduct=lazy(()=> import('../../views/seller/EditProduct'));
const OrderDetails=lazy(()=> import('../../views/seller/OrderDetails'));
const Pending=lazy(()=> import('../../views/Pending'));
const Deactivate=lazy(()=> import('../../views/Deactivate'));

export const sellerRoutes =[

  {

    path: '/seller/account-pending',
    element: <Pending/>,
   ability :'seller'
  },
  {

    path: '/seller/account-deactivate',
    element: <Deactivate/>,
    ability :'seller'

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

    path: '/seller/dashboard/edit-product/:productId',
    element: <EditProduct/>,
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
    visibility : ['active','deactivate']
},
{
  path: '/seller/dashboard/order/details/:orderId',
  element : <OrderDetails/>,
  role : 'seller',
  visibility : ['active','deactivate']
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
  role : 'seller',
  visibility : ['active','deactivate','pending']
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
  visibility : ['active','deactivate','pending']
},
]