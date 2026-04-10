const db = require('../config/db');

const Product = {
  // Fetch all active products with optional filters
  getAll: async (filters = {}) => {
    let query = 'SELECT * FROM products WHERE is_active = TRUE';
    const values = [];
    let i = 1;

    // Append filter conditions dynamically
    if (filters.skinType) {
      query += ` AND skin_type = $${i++}`;
      values.push(filters.skinType);
    }
    if (filters.brand) {
      query += ` AND brand = $${i++}`;
      values.push(filters.brand);
    }
    if (filters.category) {
      query += ` AND category = $${i++}`;
      values.push(filters.category);
    }
    if (filters.search) {
      // Search across both name and brand (case-insensitive)
      query += ` AND (LOWER(name) LIKE $${i} OR LOWER(brand) LIKE $${i++})`;
      values.push(`%${filters.search.toLowerCase()}%`);
    }
    if (filters.minPrice) {
      query += ` AND price >= $${i++}`;
      values.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      query += ` AND price <= $${i++}`;
      values.push(filters.maxPrice);
    }

    query += ' ORDER BY name ASC';
    const result = await db.query(query, values);
    return result.rows;
  },

  // Fetch a single product by ID
  getById: async (id) => {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = Product;