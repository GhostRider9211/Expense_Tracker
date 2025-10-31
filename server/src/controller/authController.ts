import { type Request,type Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
const JWT_SECRET  = process.env.JWT_SECRET as string;

export const registerUser = async(req:Request,res:Response):Promise<void>=>{
   try {
    const {username,email,password} =req.body;
    const existing = await User.findOne({email});
    if(existing){
         res.status(400).json({ message: 'User already exists' });
         return;
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({username,email,password:hashedPassword});
    await user.save();
     res.status(201).json({ message: 'User registered successfully' });
   } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const loginUser = async(req: Request, res: Response):Promise<void>=>{
    try {
        const{email,password}=req.body;
        const user =await User.findOne({email});
        if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    const isMatch = await bcrypt.compare(password,(user as any).password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:'1h'});
    res.json({token});
    } 
    catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};