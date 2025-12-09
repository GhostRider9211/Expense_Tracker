const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route   POST /api/auth/login
// @desc    Login user (Find or Create)
// @access  Public
router.post('/login', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide an email' });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name: name || email.split('@')[0],
            });
            await user.save();
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
