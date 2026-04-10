// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import route handlers
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

// Middleware — allow cross-origin requests and parse JSON bodies
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', reviewRoutes);   // review routes share /api/products base
app.use('/api/newsletter', newsletterRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'PharmaGrid API running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});