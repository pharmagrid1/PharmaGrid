const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
    try{
        const filters = {
            skinType: req.query.skinType,
            brand: req.query.brand,
            category: req.query.category,
        };

        const products = await Product.getAll(filters);
        res.status(200).json(products);
    } catch(err) {
        res.status(500).json({ message:'Error fetching products', error: err.message});
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) return res.status(404).json({message: 'Product not found'});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message});
    }
};