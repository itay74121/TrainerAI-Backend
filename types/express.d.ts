// src/types/express.d.ts
import type { Request, Response } from "express";
import type { ParsedQs } from "qs";
import type { ParamsDictionary } from "express-serve-static-core";


export interface TypedRequestBody<B>
    extends Request<ParamsDictionary, any, B, ParsedQs> {
    body: B;
}

export interface TypedRequestQuery<Q extends ParsedQs>
    extends Request<ParamsDictionary, any, any, Q> {
    query: Q;
}

export interface TypedRequestParams<P extends ParamsDictionary>
    extends Request<P> {
    params: P;
}

// ✅ params + body together
export interface TypedRequestParamsAndBody<P extends ParamsDictionary, B>
    extends Request<P, any, B, ParsedQs> {
    params: P;
    body: B;
}


