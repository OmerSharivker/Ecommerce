import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js' 
import { Elements } from '@stripe/react-stripe-js' 
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51QE5oQHKnVp8zNIWbFIX87XqsaPLIDQXHwhsFL4fHqRxpHDPMyi60OVsluhRzcp5Rs7uD6WkuuoDjiPWkCnQb3FK00eDOIErdz')

const Stripe = ({ price, orderId }) => {

    const [clientSecret, setClientSecret] = useState('')
    const appearance = {
        theme: 'stripe'
    }
    const options = {
        appearance: appearance,
        clientSecret
    }
    const create_payment = async () => {
        try {
            const { data } = await axios.post('https://ecommerce-ils0.onrender.com/api/order/create-payment',{price},{withCredentials:true})
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (

        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId}/>
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>Start Payment</button>
            }
        </div>
    );
};


export default Stripe;