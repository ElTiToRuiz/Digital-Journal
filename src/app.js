import express, { json } from "express"
import { entryRouter } from "./routes/entryRoutes.js"
import { authRouter } from "./routes/authRoutes.js"

const app = express()

app.use(json())
app.disable('x-powered-by') 

app.use("/entries", entryRouter)
app.use("/auth", authRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})