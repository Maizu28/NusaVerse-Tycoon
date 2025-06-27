const express = require('express');
const router = express.Router();
const { deposit, withdraw } = require('../controllers/bankController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);

module.exports = router;