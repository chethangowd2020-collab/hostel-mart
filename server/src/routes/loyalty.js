const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');

router.get('/:userId/points', loyaltyController.getLoyaltyPoints);
router.post('/subscribe', loyaltyController.subscribePrime);

module.exports = router;
