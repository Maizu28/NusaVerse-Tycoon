const User = require('../models/userModel');

// @desc    Deposit money to the bank
// @route   POST /api/bank/deposit
// @access  Private
const deposit = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);

  const depositAmount = parseInt(amount, 10);

  if (!depositAmount || depositAmount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  if (user.wallet.on_hand < depositAmount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  const taxRate = 0.02; // 2% tax
  const taxPaid = Math.floor(depositAmount * taxRate);
  const amountToDeposit = depositAmount - taxPaid;

  user.wallet.on_hand -= depositAmount;
  user.wallet.in_bank += amountToDeposit;

  await user.save();

  res.json({
    message: `Successfully deposited $${amountToDeposit} after a $${taxPaid} tax.`,
    wallet: user.wallet,
  });
};

// @desc    Withdraw money from the bank
// @route   POST /api/bank/withdraw
// @access  Private
const withdraw = async (req, res) => {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
  
    const withdrawAmount = parseInt(amount, 10);
  
    if (!withdrawAmount || withdrawAmount <= 0) {
      return res.status(400).json({ message: 'Invalid withdraw amount' });
    }
  
    if (user.wallet.in_bank < withdrawAmount) {
      return res.status(400).json({ message: 'Insufficient bank balance' });
    }
  
    user.wallet.in_bank -= withdrawAmount;
    user.wallet.on_hand += withdrawAmount;
  
    await user.save();
  
    res.json({
      message: `Successfully withdrew $${withdrawAmount}.`,
      wallet: user.wallet,
    });
};

module.exports = { deposit, withdraw };