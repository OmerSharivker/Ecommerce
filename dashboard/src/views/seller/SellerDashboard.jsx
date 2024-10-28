import React, { useEffect } from 'react';
import {  MdCurrencyExchange,MdProductionQuantityLimits } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6"; 
import { FaUsers } from "react-icons/fa";
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_dashboard_data } from '../../store/Reducers/dashboardReducer';
import moment from 'moment';
import customer from '../../assets/demo.jpg'
const SellerDashboard = () => {
    const dispatch=useDispatch()
    const { totalSale,
        totalOrder,
        totalProducts,
        totalPendingOrder,
       recentOrder,
       recentMessage,}=useSelector(state => state.dashboard)
   const{userInfo}=useSelector(state => state.auth)
   
    useEffect(()=>{
        dispatch(get_seller_dashboard_data())
    },[])
    const state = {
        series : [
            {
                name : "Orders",
                data : [23,34,45,56,76,34,23,76,87,78,34,45]
            },
            {
                name : "Revenue",
                data : [67,39,45,56,90,56,23,56,87,78,67,78]
            },
            {
                name : "Sales",
                data : [34,39,56,56,80,67,23,56,98,78,45,56]
            },
        ],
        options : {
            color : ['#181ee8','#181ee8'],
            plotOptions: {
                radius : 30
            },
            chart : {
                background : 'transparent',
                foreColor : '#d0d2d6'
            },
            dataLabels : {
                enabled : false
            },
            strock : {
                show : true,
                curve : ['smooth','straight','stepline'],
                lineCap : 'butt',
                colors : '#f0f0f0',
                width  : .5,
                dashArray : 0
            },
            xaxis : {
                categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
            },
            legend : {
                position : 'top'
            },
            
                responsive :[
                    {
                       breakpoint : 565,
                       yaxis : {
                        categories : ['Jan','Feb','Mar','Apl','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                    },
                    options :{
                        plotOptions: {
                            bar : {
                                horizontal :true
                            }
                        },
                        chart :{
                            height: "550px"
                        }
                    }
                    }
                ]
            }
       
    }




    return (
        <div className='px-2 md:px-7 py-5'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>

            <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                    <h2 className='text-3xl font-bold'>${totalSale}</h2>
                    <span className='text-md font-medium'>Total Sales</span>
                </div>

                <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
                <MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /> 
                </div> 
            </div>


            <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                    <h2 className='text-3xl font-bold'>{totalProducts}</h2>
                    <span className='text-md font-medium'>Products</span>
                </div>

                <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
                <MdProductionQuantityLimits  className='text-[#fae8e8] shadow-lg' /> 
                </div> 
            </div>


            <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                    <h2 className='text-3xl font-bold'>{totalOrder}</h2>
                    <span className='text-md font-medium'>Orders</span>
                </div>

                <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
                <FaCartShopping  className='text-[#fae8e8] shadow-lg' /> 
                </div> 
            </div>


            <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
                <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
                    <h2 className='text-3xl font-bold'>{totalPendingOrder ? totalPendingOrder : 0}</h2>
                    <span className='text-md font-medium'>Pending Orders</span>
                </div>

                <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl'>
                <FaCartShopping  className='text-[#fae8e8] shadow-lg' /> 
                </div> 
            </div>



        </div>

        <div className='w-full flex flex-wrap mt-7'>
            <div className='w-full lg:w-7/12 lg:pr-3'>
                 <div className='w-full  bg-[#6a5fdf] p-4 rounded-md'>
                <Chart options={state.options} series={state.series} type='bar' height={350}/>
                 </div>
            </div>
            <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
              <div className='w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
                                         Recent Customer Message 
                    </h2>
                    <Link to={'http://localhost:3001/seller/dashboard/chat-customer'} className='font-semibold text-sm text-[#d0d2d6]'> View All</Link>
                </div>

                <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6]'>
            <ol className='relative border-1 border-slate-600 ml-4'>
                {
                    recentMessage.map((m,i)=>
                        <li className='mb-3 ml-6'>
                    <div className='flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10'>
                    {
                            m.senderId === userInfo._id  ?<img className='w-full rounded-full h-full shadow-lg' src={userInfo.image} alt="" /> :
                            <img className='w-full rounded-full h-full shadow-lg' src={customer} alt="" />
                        }
                        </div>
                    <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                    <div className='flex justify-between items-center mb-2'>
                <Link className='text-md font-normal'>{m.senderName}</Link>
                <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'> {moment(m.createdAt).startOf('hour').fromNow()}</time>
                    </div>
                    <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800'>
                       {m.message}
                    </div>
                    </div>
                </li>
                    )
                }
        
            </ol>

        </div>

              </div>
          </div>
        </div>

        <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3 '>Recent Orders</h2>
                <Link to={'http://localhost:3001/seller/dashboard/orders'} className='font-semibold text-sm text-[#d0d2d6]'>View All</Link>
               </div>

    <div className='relative overflow-x-auto'>
    <table className='w-full text-sm text-left text-[#d0d2d6]'>
        <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
        <tr>
            <th scope='col' className='py-3 px-4'>Order Id</th>
            <th scope='col' className='py-3 px-4'>Price</th>
            <th scope='col' className='py-3 px-4'>Payment Status</th>
            <th scope='col' className='py-3 px-4'>Order Status</th>
            <th scope='col' className='py-3 px-4'>Action</th>
        </tr>
        </thead>

        <tbody>
      
            {
                recentOrder.map((o, i) => <tr key={i}>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>#{o._id}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>${o.price}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{o.payment_status}</td>
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{o.delivery_status}</td>
               
                <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <Link to={`http://localhost:3001/seller/dashboard/order/details/${o.orderId}`} className="text-green-500 hover:underline">
                        View
                    </Link>
                    </td>
            </tr> )
            }
        </tbody>

    </table>

    </div>

        </div>
        </div>


       
    );
};

export default SellerDashboard;