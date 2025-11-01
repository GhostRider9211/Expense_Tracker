import express, { type Response } from "express";
import { Category, Transaction } from "../models/model.js";
import { type AuthenticateRequest } from "../middleware/authmiddleware.js";
import mongoose from 'mongoose';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export const create_category = async (
  req: AuthenticateRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: user not found" });
      return;
    }

    const create = new Category({
      type: "Investment",
      color: "#FCBE44",
      userId: req.user.id,
    });

    await create.save();
    res.json(create);
  } catch (error) {
    res.status(400).json({ message: `Error while creating category: ${error}` });
  }
};

export const get_category = async (
  req: AuthenticateRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: user not found" });
      return;
    }

    const data = await Category.find({ userId: req.user.id });
    const filter = data.map((v) => ({
      type: v.type,
      color: v.color,
    }));
    res.json(filter);
  } catch (error) {
    res.status(400).json({ message: `Error fetching categories: ${error}` });
  }
};

export const update_category = async (req: AuthenticateRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { type, color } = req.body;

    const updated = await Category.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { type, color } },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Category not found or unauthorized" });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: `Error updating category: ${error}` });
  }
};


export const create_Transaction = async (
  req: AuthenticateRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized: user not found" });
      return;
    }

    if (!req.body) {
      res.status(404).json("Post HTTP Data not Provided");
      return;
    }

    const { name, type, amount } = req.body;
    if (!name || !type || !amount) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const create = new Transaction({
      name,
      type,
      amount,
      date: new Date(),
      userId: req.user.id,
    });

    await create.save();
    res.json(create);
  } catch (error) {
    res.status(400).json({ message: `Error while creating transaction: ${error}` });
  }
};



export const get_transaction = async (
  req: AuthenticateRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = await Transaction.find({ userId: req.user.id });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: `Error fetching transactions: ${error}` });
  }
};

export const delete_transaction = async (
  req: AuthenticateRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { _id } = req.body;
    if (!_id) {
      res.status(400).json({ message: "Transaction ID required" });
      return;
    }

    const result = await Transaction.deleteOne({ _id, userId: req.user.id }).clone();
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Transaction not found or unauthorized" });
      return;
    }

    res.json({ message: "Record Deleted" });
  } catch (error) {
    res.status(400).json({ message: `Error deleting transaction: ${error}` });
  }
};

export const update_transaction = async (req: AuthenticateRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id } = req.params;
    const { name, type, amount } = req.body;

    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { name, type, amount } },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Transaction not found or unauthorized" });
      return;
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: `Error updating transaction: ${error}` });
  }
};


export const get_label = async (req: AuthenticateRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const result = await Transaction.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user.id) } // filter per user
      },
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "category_info",
        },
      },
      {
        $unwind: "$category_info",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          type: 1,
          amount: 1,
          color: "$category_info.color"
        }
      }
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Lookup Collection Error" });
  }
};

