const express = require('express');
const router = express.Router();
const {protect, adminOnly} = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

//products

router.get('/products', protect, adminOnly, adminController.getAllProducts);
router.post('/products', protect, adminOnly, adminController.createProduct);
router.put('/products/:id', protect, adminOnly, adminController.updateProduct);
router.patch('/products/:id/deactivate', protect, adminOnly, adminController.deactivateProduct);

//Orders
router.get('/orders', protect, adminOnly, adminController.getAllOrders);
router.patch('/orders/:id/status', protect, adminOnly, adminController.updateOrderStatus);

module.exports = router;