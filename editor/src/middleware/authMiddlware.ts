import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        return res.status(500).send('Secret key not configured');
    }

    try {
        jwt.verify(token, secretKey)
        next();
    } catch (error: any) {
        return res.redirect('http://localhost:8000');
    }
};
