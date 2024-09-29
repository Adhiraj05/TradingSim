// controllers/tradeController.js

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { getCryptoPrice } = require('../services/cryptoService');

// Buy Cryptocurrency
exports.buyCrypto = async (req, res) => {
  const userId = req.user.id;
  const { cryptocurrency, amount } = req.body;

  try {
    // Fetch the latest price
    const price = await getCryptoPrice(cryptocurrency);

    // Calculate total cost
    const totalCost = price * amount;

    // Get user from database
    const user = await User.findById(userId);

    // Check if user has enough balance
    if (user.balance < totalCost) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    // Deduct balance
    user.balance -= totalCost;

    // Update portfolio
    user.portfolio.set(
      cryptocurrency,
      (user.portfolio.get(cryptocurrency) || 0) + amount
    );

    // Save user data
    await user.save();

    // Create a transaction record
    const transaction = new Transaction({
      user: userId,
      cryptocurrency,
      amount,
      price,
      type: 'buy',
    });
    await transaction.save();

    res.json({ msg: 'Cryptocurrency purchased successfully' });
  } catch (error) {
    console.error('Error in buyCrypto:', error);
    res.status(500).send('Server error');
  }
};

// Sell Cryptocurrency
exports.sellCrypto = async (req, res) => {
  const userId = req.user.id;
  const { cryptocurrency, amount } = req.body;

  try {
    // Fetch the latest price
    const price = await getCryptoPrice(cryptocurrency);

    // Get user from database
    const user = await User.findById(userId);

    const cryptoAmount = user.portfolio.get(cryptocurrency) || 0;

    // Check if user has enough cryptocurrency
    if (cryptoAmount < amount) {
      return res.status(400).json({ msg: 'Insufficient cryptocurrency balance' });
    }

    // Update portfolio
    user.portfolio.set(cryptocurrency, cryptoAmount - amount);

    // Add balance
    const totalProceeds = price * amount;
    user.balance += totalProceeds;

    // Save user data
    await user.save();

    // Create a transaction record
    const transaction = new Transaction({
      user: userId,
      cryptocurrency,
      amount,
      price,
      type: 'sell',
    });
    await transaction.save();

    res.json({ msg: 'Cryptocurrency sold successfully' });
  } catch (error) {
    console.error('Error in sellCrypto:', error);
    res.status(500).send('Server error');
  }
};
