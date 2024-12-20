const experss =require('express');
const app=experss();
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utiles/db');
const socket= require('socket.io');
const http =require('http');
const { userInfo } = require('os');
const sellerCustomerModel = require('./models/chat/sellerCustomerModel');
const { ConnectionStates } = require('mongoose');
const server =http.createServer(app)


app.use(cors({
    origin : ['https://shariv-shop.netlify.app','https://shariv-dashboard.netlify.app','http://localhost:3000','http://localhost:3001'],
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true,
        methods: ["GET", "POST"]
    }
})

var allCustomer = []
var allSeller = []
let admin = {}

const addUser = (customerId, socketId, userInfo) => {
    const userIndex = allCustomer.findIndex(u => u.customerId === customerId);
    if (userIndex !== -1) {
        allCustomer[userIndex].socketId = socketId; // Update socket ID if user exists
    } else {
        allCustomer.push({ customerId, socketId, userInfo });
    }
    io.emit('activeUsers', allCustomer); // Broadcast updated list
}

const addSeller = (sellerId, socketId, userInfo) => {
    const sellerIndex = allSeller.findIndex(u => u.sellerId === sellerId);
    if (sellerIndex !== -1) {
        allSeller[sellerIndex].socketId = socketId; // Update socket ID if seller exists
    } else {
        allSeller.push({ sellerId, socketId, userInfo });
    }
    io.emit('activeSeller', allSeller); // Broadcast updated list
}

// Emit updated list after removing a user
const remove = (socketId) => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId);
    allSeller = allSeller.filter(s => s.socketId !== socketId);
    io.emit('activeUsers', allCustomer);
    io.emit('activeSeller', allSeller);
}
const findCustomer = (customerId) => {
    return allCustomer.find(c => c.customerId === customerId)
}
const findSeller = (sellerId) => {
    return allSeller.find(c => c.sellerId === sellerId)
}



io.on('connection', (soc) => {
    console.log('socket server running..')

    soc.on('add_user',(customerId,userInfo)=>{
        
         addUser(customerId,soc.id,userInfo)
          
    })
    soc.on('add_seller',(sellerId, userInfo) => {

       addSeller(sellerId,soc.id,userInfo)
       console.log( soc.id)
     
    })
    soc.on('send_seller_message',(msg) => {
        const customer = findCustomer(msg.receiverId)
        if (customer !== undefined) {
            soc.to(customer.socketId).emit('seller_message', msg)
        }
    })  
    soc.on('send_customer_message',(msg) => {
        const seller = findSeller(msg.receiverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('customer', msg)
            console.log(msg)
       }
    
    })  

    soc.on('send_message_admin_to_seller',(msg) => {
        const seller = findSeller(msg.receiverId)
        if (seller !== undefined) {
            soc.to(seller.socketId).emit('received_admin_message', msg)
            console.log(seller.socketId)
        }
        console.log(seller)
    })

    soc.on('send_message_seller_to_admin',(msg) => { 
        if (admin.socketId) {
            soc.to(admin.socketId).emit('received_seller_message', msg)
        }
    })

    soc.on('add_admin',(adminInfo) => {
        delete adminInfo.email
        delete adminInfo.password
        admin = adminInfo
        admin.socketId = soc.id  
        io.emit('activeSeller', allSeller) 

     })

    soc.on('disconnect',() => {
        console.log('user disconnect')
        remove(soc.id)
     
    })


})


require('dotenv').config()
  

app.use(bodyParser.json())
app.use(cookieParser())
 
app.use('/api/home',require('./routes/home/homeRoutes'));
app.use('/api',require('./routes/authRoutes'));
app.use('/api',require('./routes/dashboard/categoryRoutes'));
app.use('/api',require('./routes/dashboard/productRoutes'));
app.use('/api',require('./routes/dashboard/sellerRoutes'));
app.use('/api',require('./routes/home/customerAuthRoutes'));
app.use('/api/home',require('./routes/home/cartRoutes'));
app.use('/api',require('./routes/order/orderRoutes'));
app.use('/api',require('./routes/chatRoutes'));
app.use('/api',require('./routes/paymentRoutes'));
app.use('/api',require('./routes/dashboard/dashboardRoutes'));

app.get('/',(req,res)=>res.send("my backend"));
const port = process.env.PORT;
dbConnect();
server.listen(port, () => console.log(`Server is running on port ${port}`))
