import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    role: string
    sub: string
}


 function ensureAuthenticated( request: Request, repsonse: Response, next: NextFunction){
    try {
        const authHeader = request.headers.authorization

        if(!authHeader) {
            throw new AppError("JWT token not found")
        }

        const [, token] = authHeader.split(" ")

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload // Desestrutura o token

        request.user = {
            id: user_id,
            role
        }

        return next()
    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }
 }

 export { ensureAuthenticated }