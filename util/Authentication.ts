import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";

export async function Authorization(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const secret: Secret = process.env.ACCESS_TOKEN_SECRET
            ? process.env.ACCESS_TOKEN_SECRET
            : "";
        const obj = jwt.verify(req.body.token, secret);
        req.body = obj;
        next();
    } catch (error: any) {
        if (error.name == jwt.JsonWebTokenError.name) {
            console.log(error.message);
        }
        res.status(401).send("Unauthorized");
    }
}

export async function getJWT(data:string):Promise<string> {
    return new Promise((res,rej)=>{
        try{
            const secret: Secret = process.env.ACCESS_TOKEN_SECRET
                ? process.env.ACCESS_TOKEN_SECRET
                : "";
            const token = jwt.sign(data, secret, {
                algorithm: "HS256",
            });
            res(token)
        }
        catch (error){
            rej(error)
        }
        
    })
}
