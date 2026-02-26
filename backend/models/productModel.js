const db = require('../config/db');
const { getById } = require('./orderModel');

const Product = {
    getAll: async (filters = {} ) => {
        let query = 'SELECT * FROM products WHERE 1=1';
        const values = [];
        let i = 1;

        if  (filters.skinType) {
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

        query += ' ORDER BY name ASC';
        const result = await db.query(query, values);
        return result.rows;
    },
    getById: async (id) => {
        const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    }
};

module.exports = Product;