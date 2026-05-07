const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/group/create', orderController.createGroupCart);
router.post('/group/join', orderController.joinGroupCart);
router.post('/group/add-item', orderController.addItemToGroupCart);
router.post('/place', orderController.placeOrder);

module.exports = router;
