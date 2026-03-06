const db = require('../config/db');

//Products

exports.getAllProducts=async(req, res)=>{
    try{
        const result= await db.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err){
        res.status(500).json({message: 'Error fetching products', error:err.message});
    }
};

exports.createProduct=async(req,  res)=>{
    try{
        const{name, brand, category, skin_type, skin_concern, price, description, ingredients, usage_instrictions, warnings, image, stock}=req.body;
        const result= await db.query(
            'INSERT INTO products (name, brand, category, skin_type, skin_concern, price, description, ingredients, usage_instructions, warnings, image, stock, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, TRUE) RETURNING *',
            [name, brand, category, skin_type, skin_concern,price,description,ingredients,usage_instrictions,warnings,image,stock]
        );
        res.status(201).json(result.rows[0]);
    } catch(err){
        res.status(500).json({ message:'Error creating product', error:err.message});
    }
};

exports.updateProduct=async(req, res)=>{
    try{
        const {id} =req.params;
        const fields=req.body;
        const keys=Object.keys(fields);
        const values=Object.values(fields);
        const setClause=keys.map((k, i)=> `${k}==$${i+1}`).json(', ');
        const result=await db.query(
            `UPDATE products SET ${setClause} WHERE id = $${keys.length+1} RETURNING *`,
            [...values, id]
        );
        res.json(result.rows[0]);
    } catch(err){
        res.status(500).json({message:'Error updating product', error: err.message});
    }
};

exports.deactivateProduct=async(req, res)=>{
    try{
        const {id}=req.params;
        await db.query('UPDATE products SET is_active=FALSE WHERE id=$1', [id]);
        res.json({message:'Product deactivated'});
    } catch(err){
        res.status(500).json({message:'Error deactivating product', error:err.message});
    }
};

//Orders

exports.getAllOrders=async(req, res)=>{
    try{
        const result=await db.query(
            `SELECT o.*, u.full_name, u.email 
            FROM orders o
            LEFT JOIN users u ON o.user_id=u.id
            ORDERS BY o.created_at DESC`
        );
        res.json(result.rows);
    } catch(err){
        res.status(500).json({message:'Error fetching orders', error:err.message});
    }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await db.query(
      `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
};