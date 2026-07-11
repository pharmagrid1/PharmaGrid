const db = require('../config/db');
const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email?.includes('@')) return res.status(400).json({ error: 'Invalid email' });

    // Save to DB
    await db.query(
      'INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT DO NOTHING',
      [email]
    );

    // Send welcome email
    if (!resend) {
      console.warn('RESEND_API_KEY not set, skipping email');
      return res.json({ message: 'Subscribed' });
    }
    await resend.emails.send({
      from: 'PharmaGrid <newsletter@yourdomain.com>',
      to: email,
      subject: 'Welcome to PharmaGrid',
      html: `
        <div style="font-family: DM Sans, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="color: #1A7A6E; font-size: 28px;">Welcome to PharmaGrid</h1>
          <p style="color: #4A4A46; font-size: 15px; line-height: 1.6;">
            Thank you for subscribing! You'll be the first to know about new arrivals, 
            skincare tips, and exclusive offers.
          </p>
          <a href="https://pharmagrid.com/products" 
             style="display: inline-block; margin-top: 24px; background: #1A7A6E; 
                    color: white; padding: 12px 28px; border-radius: 4px; 
                    text-decoration: none; font-weight: 500;">
            Shop Now →
          </a>
          <p style="margin-top: 32px; font-size: 12px; color: #9A9A94;">
            PharmaGrid · Pharmacy-grade skincare curated by dermatologists
          </p>
        </div>
      `
    });

    res.json({ message: 'Subscribed' });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ error: 'Subscription failed', message: err.message });
  }
};

module.exports = { subscribe };