const Order = require('../models/orderModel');
const {protect} =require('../middleware/authMiddleware');

exports.createOrder = async (req, res) => {
    try {
        const {user_id, total_amount, delivery_method, items} = req.body;

        const newOrder = await Order.create({
            user_id,
            total_amount,
            delivery_method,
            status:'Pending'
        });

        if(items && items.length>0){
            await Order.createItems(newOrder.id, items);
        }

        await Order.deductStock(items);

        res.status(201).json(newOrder);
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error:error.message});
    }
};

exports.getOrdersByUser = async(req, res)=>{
    try{
        const userId = req.params.userId;

        const orders = await Order.getByUserId(userId);

        res.json(orders);


    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message});
    }
};