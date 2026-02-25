const db = require('../config/db');

const Order = {
    create: async(orderData) => {
        const {user_id, total_amount, delivery_method, status} = orderData;

        const result = await db.query(
            `INSERT INTO orders (user_id, total_amount, delivery_method, status)
            VALUES($1,$2,$3,$4)
            RETURNING *
            `,
            [user_id, total_amount, delivery_method, status]
        );
        return result.rows[0];
    },
    getUserById: async(userId) => {
        const result = await db.query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        );
        return result.rows;
    },
    getById: async(id) => {
        const result = await db.query(
            `SELECT * FROM orders WHERE id=$1`,
            [id]
        );
        return result.rows[0];
    },
};
module.exports = Order;