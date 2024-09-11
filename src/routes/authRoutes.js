import express from "express"
import { AuthController } from "../controllers/authController.js"

export const authRouter = express.Router()

authRouter.get('/', (req, res)=>{
    res.send("<h1>AUTHORITATION</h1>")
})

authRouter.post("/login", AuthController.login)

authRouter.post("/register", AuthController.register)