const User = require('../models/userModel');
const Item = require('../models/itemModel');

// @desc    Get user dashboard data
// @route   GET /api/game/dashboard
// @access  Private
const getDashboardData = async (req, res) => {
  // The user object is already attached to req by the 'protect' middleware
  res.json(req.user);
};

// @desc    Perform a profession-specific action
// @route   POST /api/game/perform-action
// @access  Private
const performProfessionAction = async (req, res) => {
  const user = await User.findById(req.user.id);
  const profession = user.profile.profession;
  let message = '';
  
  // Basic energy check
  if (user.profile.energy < 10) {
      return res.status(400).json({ message: 'Not enough energy!' });
  }
  user.profile.energy -= 10; // Deduct energy for action

  try {
    switch (profession) {
      case 'petani':
        // Action: Menghasilkan "Panen Kripto"
        // Anda harus membuat item "Panen Kripto" di database terlebih dahulu
        const panenKripto = await Item.findOne({ name: 'Panen Kripto' });
        if (!panenKripto) return res.status(500).json({ message: 'Item "Panen Kripto" not found in DB'});

        const itemIndex = user.inventory.findIndex(item => item.itemId.equals(panenKripto._id));
        const amountGained = Math.floor(Math.random() * 5) + 1; // 1 to 5

        if (itemIndex > -1) {
          user.inventory[itemIndex].quantity += amountGained;
        } else {
          user.inventory.push({ itemId: panenKripto._id, quantity: amountGained });
        }
        message = `Anda berhasil memanen ${amountGained} Panen Kripto!`;
        break;

      case 'streamer':
        // Action: Mendapatkan donasi
        const donation = Math.floor(Math.random() * 500) + 50; // 50 to 550
        user.wallet.on_hand += donation;
        message = `Go Live Sukses! Anda mendapatkan donasi sebesar $${donation}.`;
        break;

      case 'hacker':
        // Action: Mendapatkan "Paket Data"
        const paketData = await Item.findOne({ name: 'Paket Data' });
        if (!paketData) return res.status(500).json({ message: 'Item "Paket Data" not found in DB'});
        
        const dataIndex = user.inventory.findIndex(item => item.itemId.equals(paketData._id));
        const dataGained = Math.floor(Math.random() * 3) + 1; // 1 to 3

        if (dataIndex > -1) {
          user.inventory[dataIndex].quantity += dataGained;
        } else {
          user.inventory.push({ itemId: paketData._id, quantity: dataGained });
        }
        message = `Berhasil meretas jaringan dan mendapatkan ${dataGained} Paket Data!`;
        break;
        
      default:
        return res.status(400).json({ message: 'No profession selected or profession is invalid.' });
    }

    await user.save();
    const userResponse = { ...user.toObject() };
    delete userResponse.password;

    res.json({ message, updatedUser: userResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during action.' });
  }
};


module.exports = { getDashboardData, performProfessionAction };