const db = require('../config/db');

const Order = {
  // Create a new order record
  create: async (orderData) => {
    const { user_id, total_amount, delivery_method, status } = orderData;
    const result = await db.query(
      `INSERT INTO orders (user_id, total_amount, delivery_method, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, total_amount, delivery_method, status]
    );
    return result.rows[0];
  },

  // Insert individual line items for an order
  createItems: async (order_id, items) => {
    for (const item of items) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order_id, item.product_id, item.quantity, item.price]
      );
    }
  },

  // Reduce stock for each product in the order
  // Guard prevents stock going below zero
  deductStock: async (items) => {
    for (const item of items) {
      await db.query(
        `UPDATE products SET stock = stock - $1
         WHERE id = $2 AND stock >= $1`,
        [item.quantity, item.product_id]
      );
    }
  },

  // Fetch all orders for a user including their line items
  getByUserId: async (userId) => {
    const ordersResult = await db.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    const orders = ordersResult.rows;

    // Attach items to each order (N+1 — acceptable at current scale)
    for (const order of orders) {
      const itemsResult = await db.query(
        `SELECT oi.*, p.name as product_name, p.image
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );
      order.items = itemsResult.rows;
    }

    return orders;
  },

  // Fetch a single order by ID
  getById: async (id) => {
    const result = await db.query(
      `SELECT * FROM orders WHERE id = $1`, [id]
    );
    return result.rows[0];
  }
};

module.exports = Order;