import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("SessionsController", () => {
    let user_id: string

    afterAll(async () => {
        if (user_id) {
            await prisma.user.delete({ where: { id: user_id } })
        }
    })

    it("should authenticate a and get acess token", async () =>{
        const UserResponse = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
        })

        user_id = UserResponse.body.id

        const sessionResponse = await request(app).post("/sessions").send({
            email: "testuser@example.com",
            password: "password123",
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token).toEqual(expect.any(String))
    })
})