const db = require('../config/db');

const User = {
    create: async ({full_name, email, password_hash }) => {
        const result = await db.query(
            `INSERT INTO users(full_name, email, password_hash)
            VALUES ($1, $2, $3) RETURNING id, full_name, email, role`,
            [full_name, email, password_hash]
        );
    return result.rows[0];
},

findByEmail: async(email) => {
    const result = await db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows[0];
},

findById: async(id) => {
    const result = await db.query(
        `SELECT id, full_name, email, role FROM users WHERE id = $1`,
    );
    return result.rows[0];
}
};

module.exports = User;