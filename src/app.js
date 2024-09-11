import express, { json } from "express"
import { entryRouter } from "./routes/entryRoutes.js"
import { authRouter } from "./routes/authRoutes.js"
import { devRouter } from "./routes/devRouter.js"

const app = express()

app.use(json())
app.disable('x-powered-by') 

app.use("/entries", entryRouter)
app.use("/auth", authRouter)

// ONLY FOR DEVELOPMENT
app.use("/dev", devRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})