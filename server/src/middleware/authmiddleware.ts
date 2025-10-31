import {type Request,type Response,type NextFunction} from 'express'
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET|| 'your_secret_key';

export interface AuthenticateRequest extends Request{
    user?:any;
}

export const authenticateToken=(req:Request,res:Response,next:NextFunction):void=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        res.status(401).json({message:'Access denied'});
        return;
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            res.status(403).json({message:'Invalid token'});
            return;
        }
        (req as any).user=user;
        next();
    });


};


