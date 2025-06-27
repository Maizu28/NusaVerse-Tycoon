const express = require('express');
const router = express.Router();
const { getDashboardData, performProfessionAction } = require('../controllers/gameController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, getDashboardData);
router.post('/perform-action', protect, performProfessionAction);

module.exports = router;