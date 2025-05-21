const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const expenseController = require('../controllers/expenseController');

router.get('/', protect, expenseController.getExpenses);
router.post('/', protect, expenseController.addExpense);
router.put('/:id', protect, expenseController.updateExpense);
router.delete('/:id', protect, expenseController.deleteExpense);
module.exports = router;