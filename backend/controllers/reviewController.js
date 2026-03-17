const db = require('../config/db');

const getReviews = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT r.id, r.product_id, r.user_id, r.rating, r.comment, r.created_at,
              u.full_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [req.params.productId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews', error: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    await db.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (product_id, user_id)
       DO UPDATE SET rating=$3, comment=$4`,
      [req.params.productId, req.user.id, rating, comment]
    );
    await db.query(
      'UPDATE products SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id=$1) WHERE id=$1',
      [req.params.productId]
    );
    res.json({ message: 'Review saved' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save review', error: err.message });
  }
};

module.exports = { getReviews, createReview };