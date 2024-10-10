const experss =require('express');
const app=experss();
require('dotenv').config();
const cors=require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbConnect } = require('./utiles/db');

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials : true
}))

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/home',require('./routes/home/homeRoutes'));
app.use('/api',require('./routes/authRoutes'));
app.use('/api',require('./routes/dashboard/categoryRoutes'));
app.use('/api',require('./routes/dashboard/productRoutes'));
app.use('/api',require('./routes/dashboard/sellerRoutes'));


app.get('/',(req,res)=>res.send("my backend"));
const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`Server is running on port ${port}`));
