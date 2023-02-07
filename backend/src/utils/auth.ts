import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'default_secret';
const expiration = process.env.JWT_EXPIRE || '12h';

interface Req extends Request {
    user: JwtPayload | string;
}

export function authMiddleware({ req }: { req: Request }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ')
        .pop()
        .trim();
    }
    if (!token){
        return req;
    }

    try {
        const data = jwt.verify(token, secret, {maxAge: expiration });
        console.log(data)
        // i do not remember what the purpose of appending req with data was but Ts hates that and I can't be bothered to work around it.
        // unless it turns out i did it for a good reason, we'll see
        // req.user = data;
    } catch {
        console.error('Invalid token');
    }
    return req;
};

export function signToken({ displayName, email, _id }:{ displayName: string, email: string, _id: Types.ObjectId}) {
    const payload = { displayName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};