require('dotenv').config();
const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

//Midleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

//Test route
app.get('/', (req, res)=>{
    res.json({message: 'PharmaGrid API running'});
});

//Port
const PORT=process.env.PORT ||5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});