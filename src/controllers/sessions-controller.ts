import { Request, response, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

class SessionsController {
    async create(request: Request, response: Response){
        const bodyShema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { email, password } = bodyShema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: { email }
        })

        if(!user){
            throw new AppError("Invalid email or password", 401)
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new AppError("Invalid email or password", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn
        })

        const { password: hashedPassword, ...userWithoutPassword } = user // Retorna o usuario sem a password

        return response.json({ token, user: userWithoutPassword})
    }
}

export { SessionsController }