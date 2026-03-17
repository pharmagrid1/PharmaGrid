const db = require('../config/db');

// Products

const getAllProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY id ASC');
    res.json({ products: result.rows, total: result.rows.length });
  } catch (err) {
    console.error('getAllProducts error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, brand, category, skin_type, skin_concern, price, description, ingredients, usage_instructions, warnings, image, stock } = req.body;
    const result = await db.query(
      'INSERT INTO products (name, brand, category, skin_type, skin_concern, price, description, ingredients, usage_instructions, warnings, image, stock, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, TRUE) RETURNING *',
      [name, brand, category, skin_type, skin_concern, price, description, ingredients, usage_instructions, warnings, image, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const result = await db.query(
      `UPDATE products SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
      [...values, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

const deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('UPDATE products SET is_active = FALSE WHERE id = $1', [id]);
    res.json({ message: 'Product deactivated' });
  } catch (err) {
    res.status(500).json({ message: 'Error deactivating product', error: err.message });
  }
};

const activateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      'UPDATE products SET is_active = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('activateProduct error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Orders

const getAllOrders = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json({ orders: result.rows, total: result.rows.length });
  } catch (err) {
    console.error('getAllOrders error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
};

const getNewOrdersCount = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT COUNT(*) FROM orders WHERE status = 'Pending'"
    );
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get count', error: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
  activateProduct,
  getAllOrders,
  updateOrderStatus,
  getNewOrdersCount
};