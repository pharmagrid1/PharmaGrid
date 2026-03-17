const db = require('../config/db');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email?.includes('@')) return res.status(400).json({ error: 'Invalid email' });
    await db.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT DO NOTHING',
      [email]
    );
    res.json({ message: 'Subscribed' });
  } catch (err) {
    res.status(500).json({ error: 'Subscription failed', message: err.message });
  }
};

module.exports = { subscribe };