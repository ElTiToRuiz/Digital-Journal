import express from "express"
import { AuthController } from "../controllers/authController.js"
// import { authMiddleware } from "../middlewares/authMiddleware.js"

export const authRouter = express.Router()

// authRouter.get(authMiddleware())

authRouter.get('/', (req, res)=>{
    res.send("<h1>AUTHORITATION</h1>")
})

authRouter.post("/login", AuthController.login)

authRouter.post("/register", AuthController.register)

// authRouter.post("/logout", AuthController.logout)