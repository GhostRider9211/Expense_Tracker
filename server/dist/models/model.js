import mongoose, { Schema, Document, Model } from 'mongoose';
const CategorySchema = new Schema({
    type: { type: String, default: 'Investment' },
    color: { type: String, default: '#FCBE44' },
});
export const Category = mongoose.model('Category', CategorySchema);
const TransactionSchema = new Schema({
    name: { type: String, default: 'Anonymous' },
    type: { type: String, default: 'Investment' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
export const Transaction = mongoose.model('Transaction', TransactionSchema);
