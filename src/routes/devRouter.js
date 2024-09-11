import express from "express"
import { AuthController } from "../controllers/authController.js"

export const devRouter = express.Router()

devRouter.get("/", AuthController.getAll)
