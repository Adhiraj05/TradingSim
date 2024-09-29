// routes/leaderboardRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get Top Users
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find()
      .select('username totalPortfolioValue percentageGain')
      .sort({ totalPortfolioValue: -1 })
      .limit(10);

    res.json(topUsers);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
