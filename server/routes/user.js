const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   GET /api/user/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/user/:id/profile
// @desc    Update user financial profile
// @access  Public
router.put('/:id/profile', async (req, res) => {
    const { income, initialBalance } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (income !== undefined) user.income = income;
        if (initialBalance !== undefined) user.initialBalance = initialBalance;

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
