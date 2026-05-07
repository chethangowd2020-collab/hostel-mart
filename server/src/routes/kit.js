const express = require('express');
const router = express.Router();
const kitController = require('../controllers/kitController');

router.get('/', kitController.getKits);
router.get('/:name', kitController.getKitByName);

module.exports = router;
