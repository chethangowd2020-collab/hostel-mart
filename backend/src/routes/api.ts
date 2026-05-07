import express from 'express';
import { getProducts, getProductById, registerRestockNotify } from '../controllers/product.controller';
import { createOrder, getOrderHistory, confirmSafety } from '../controllers/order.controller';
import { getProfile, updateCollege, upgradeToPrime, updateProfile } from '../controllers/user.controller';
import { addToWishlist, getWishlist } from '../controllers/wishlist.controller';
import { postProductReview, upvoteReview } from '../controllers/review.controller';
import { login, register } from '../controllers/auth.controller';

const router = express.Router();

// Auth — Password Based Login
router.post('/auth/register', register);
router.post('/auth/login', login);

// Products
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products/notify-restock', registerRestockNotify);

// Orders
router.post('/orders', createOrder);
router.get('/orders/history/:studentId', getOrderHistory);
router.post('/orders/confirm-safety', confirmSafety);

// Users
router.get('/users/profile/:id', getProfile);
router.post('/users/update-profile', updateProfile);
router.post('/users/sync-college', updateCollege);
router.post('/users/prime-upgrade', upgradeToPrime);

// Wishlist
router.post('/wishlist/add', addToWishlist);
router.get('/wishlist/:studentId', getWishlist);

// Reviews
router.post('/reviews/product', postProductReview);
router.post('/reviews/:reviewId/upvote', upvoteReview);

export default router;
