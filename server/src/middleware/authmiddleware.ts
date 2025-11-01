import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";

export interface AuthenticateRequest extends Request {
  user?: { id: string };
}

export const authenticateToken = (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
