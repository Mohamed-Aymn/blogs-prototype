import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';

export const getUserIdFromToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        return decoded.sub as string;
    } catch (err) {
        console.error('Invalid token', err);
        return null;
    }
}