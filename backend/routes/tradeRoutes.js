// routes/tradeRoutes.js

const express = require('express');
const router = express.Router();
const { buyCrypto, sellCrypto } = require('../controllers/tradeController');
const auth = require('../middleware/auth');

// Buy Cryptocurrency
router.post('/buy', auth, buyCrypto);

// Sell Cryptocurrency
router.post('/sell', auth, sellCrypto);

module.exports = router;
