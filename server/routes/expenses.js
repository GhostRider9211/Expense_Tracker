const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route   GET /api/expenses/:userId
// @desc    Get all expenses for a user
// @access  Public (should be private in real app)
router.get('/:userId', async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.params.userId }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/expenses
// @desc    Add new expense
// @access  Public
router.post('/', async (req, res) => {
    const { userId, description, amount, category, date } = req.body;

    try {
        const newExpense = new Expense({
            user: userId,
            description,
            amount,
            category,
            date,
        });

        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete expense
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        await expense.deleteOne();

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
