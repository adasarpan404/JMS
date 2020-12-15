const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Transaction must belongs to User']
    },
    transactiontype: {
        type: String,
        enum: ['credit', 'debit']
    },
    amount: {
        type: Number,
        required: [true, 'Transaction should have a amount ']
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction