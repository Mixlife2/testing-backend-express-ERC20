const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchainController');

router.get('/', blockchainController.test);
router.get('/balance', blockchainController.getBalance);
router.post('/transfer', blockchainController.transferTokens);

module.exports = router;