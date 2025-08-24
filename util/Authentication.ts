import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";

export async function Authorization(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (req.path ===  '/auth'){

        }
        const secret: Secret = process.env.ACCESS_TOKEN_SECRET
            ? process.env.ACCESS_TOKEN_SECRET
            : "";
        let reqToken: string = req.headers["authorization"]
            ? req.headers["authorization"]
            : "";
        const BearerBegin: string = "Bearer ";
        if (reqToken && reqToken.startsWith(BearerBegin)) {
            reqToken = reqToken.slice(BearerBegin.length);
        }
        const obj = jwt.verify(reqToken, secret);
        req.body = { ...req.body, obj };
        next();
    } catch (error: any) {
        if (error.name == jwt.JsonWebTokenError.name) {
            // console.log(error.message);
        }
        res.status(401).json({message: "Unauthorized"});
    }
}

export async function getJWT(data: string): Promise<string> {
    return new Promise((res, rej) => {
        try {
            const secret: Secret = process.env.ACCESS_TOKEN_SECRET
                ? process.env.ACCESS_TOKEN_SECRET
                : "";
            const token = jwt.sign(data, secret, {
                algorithm: "HS256",
            });
            res(token);
        } catch (error) {
            rej(error);
        }
    });
}
