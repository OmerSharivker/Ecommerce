import io from 'socket.io-client'

export const overRideStyle={
    display :'flex',
    margin: '0 auto',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center'
   }
export const socket=io('https://ecommerce-ils0.onrender.com')