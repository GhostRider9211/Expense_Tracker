import express, {} from "express";
import { Category, Transaction } from "../models/model.js";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
export const create_category = async (_req, res) => {
    try {
        const create = new Category({
            type: "Investment",
            color: "#FCBE44",
        });
        await create.save();
        res.json(create);
    }
    catch (error) {
        res.status(400).json({ message: `Error while creating category:${error}` });
    }
};
export const get_category = async (_req, res) => {
    try {
        const data = await Category.find({});
        const filter = data.map((v) => ({
            type: v.type,
            color: v.color,
        }));
    }
    catch (error) {
        res.status(400).json({ message: `Error fetching categories:${error}` });
    }
};
export const create_Transaction = async (req, res) => {
    try {
        if (!req.body) {
            res.status(404).json("Post HTTP Data not Provided");
            return;
        }
        const { name, type, amount } = req.body;
        const create = new Transaction({
            name,
            type,
            amount,
            date: new Date(),
        });
        await create.save();
        res.json(create);
    }
    catch (error) {
        res
            .status(400)
            .json({ message: `Error while creating transaction:${error}` });
    }
};
export const get_transaction = async (_req, res) => {
    try {
        const data = await Transaction.find({});
        res.json(data);
    }
    catch (error) {
        res.status(400).json({ message: `Error fetching transactions: ${error}` });
    }
};
export const delete_transaction = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ message: "Request body not found" });
            return;
        }
        await Transaction.deleteOne(req.body).clone();
        res.json("Record Deleted!....");
    }
    catch (error) {
        res
            .status(400)
            .json({ message: `Error while deleting transaction record: ${error}` });
    }
};
export const get_label = async (_req, res) => {
    try {
        const result = await Transaction.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'type',
                    foreignField: 'type',
                    as: 'category_info',
                },
            },
            {
                $unwind: '$category_info',
            },
        ]);
        const data = result.map(v => ({
            _id: v.id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.category_info,
        }));
        res.json(data);
    }
    catch (error) {
        res.status(400).json("Lookup Collection Error");
    }
};
