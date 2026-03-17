const express=require('express');
const router=express.Router();
const reviewController=require('../controllers/reviewController');
const {protect}=require('../middleware/authMiddleware');

router.get('/:productId/reviews', reviewController.getReviews);
router.post('/:productId/reviews', protect, reviewController.createReview);

module.exports=router;