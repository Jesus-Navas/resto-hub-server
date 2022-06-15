import dotenv from 'dotenv';
dotenv.config();
import { sign, verify } from 'jsonwebtoken';

//TODO: Find a better way for JWTSECRET
export const generateAccessToken = (user: any) => {
    return sign(
        {
            userId: user._id,
            username: user.username,
            favRestaurants: user.favRestaurants,
        },
        process.env.TOKEN_SECRET as string
    );
};

export const verifyAccessToken = (token: string) => {
    return verify(token, process.env.TOKEN_SECRET as string);
};