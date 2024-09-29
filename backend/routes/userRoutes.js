// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUser } = require('../controllers/userController');

// Get User Info
router.get('/me', auth, getUser);

module.exports = router;
