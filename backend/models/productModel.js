const db = require('../config/db');

const Product = {
    getAll: async (filters = {} ) => {
        let query = 'SELECT * FROM products WHERE is_active=TRUE';
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
        if(filters.search){
            query += `AND (LOWER(name) LIKE $${i} OR LOWER(brand) LIKE $${I++})`;
            values.push(`%${filters.search.toLowerCase()}`);
        }
        if(filters.minPrice){
          query += `AND price >= $${i++}`;
            values.push(filters.minPrice);
        }
        if(filters.maxPrice){
            query += ` AND price <= $${i++}`;
            values.push(filters.maxPrice);
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