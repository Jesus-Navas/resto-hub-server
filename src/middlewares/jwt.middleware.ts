import jwt from 'express-jwt';
import { Request } from 'express';

const isAuthenticated = jwt({
    secret: process.env.TOKEN_SECRET!,
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req: Request) {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        const token = req.headers.authorization.split(' ')[1];
        return token;
    }
    return null;
}

export default isAuthenticated;