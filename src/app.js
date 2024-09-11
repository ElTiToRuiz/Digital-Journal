import express, { json } from "express"
import cors from "cors"
import { entryRouter } from "./routes/entryRoutes.js"
import { authRouter } from "./routes/authRoutes.js"
import { devRouter } from "./routes/devRouter.js"

const app = express()

app.disable('x-powered-by') 
app.use(cors())
app.use(json())

app.use("/entries", entryRouter)
app.use("/auth", authRouter)

// ONLY FOR DEVELOPMENT
app.use("/dev", devRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})