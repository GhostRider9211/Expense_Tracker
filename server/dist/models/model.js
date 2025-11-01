import mongoose, { Schema, Document, Model } from 'mongoose';
const CategorySchema = new Schema({
    type: { type: String, default: 'Investment' },
    color: { type: String, default: '#FCBE44' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
export const Category = mongoose.model('Category', CategorySchema);
const TransactionSchema = new Schema({
    name: { type: String, default: 'Anonymous' },
    type: { type: String, default: 'Investment' },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});
export const Transaction = mongoose.model('Transaction', TransactionSchema);
