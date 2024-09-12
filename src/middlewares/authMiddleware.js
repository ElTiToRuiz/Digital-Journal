import jwt from "jsonwebtoken"
import { getJWT_TOKEN } from "../service/connection.js";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(400).json({message: 'Token not found', denied: true})
    try {
        const result = jwt.verify(token, getJWT_TOKEN());
        if (result) {
            next();
        } else {
            res.status(400).json({message: 'Token not accepted', denied: true});
        }
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(400).json({message: 'Something goes wrong', denied: true});
    }
};