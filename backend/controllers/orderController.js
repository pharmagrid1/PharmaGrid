const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    try {
        const {user_id, total_amount, delivery_method} = req.body;

        const newOrder = await Order.create({
            user_id,
            total_amount,
            delivery_method,
            status:'Pending'
        });
        res.status(201).json(newOrder);
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating order'});
    }
};

exports.getOrdersByUser = async(req, res)=>{
    try{
        const userId = req.params.userId;

        const orders = await Order.getByUserId(userId);

        res.json(orders);


    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders'});
    }
};