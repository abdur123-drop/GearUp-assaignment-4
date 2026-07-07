import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import { authRouter } from "./module/auth/auth.router";
import { notFound } from "./middleware/notFound";
import { globalErrorHandling } from "./middleware/globalError";
import { categoryRouter } from "./module/category/category.router";
import { gearRouter } from "./module/gearItem/gear.router";
import { rentelOrderROuter } from "./module/renterlOrder/rentelOrder.router";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req: Request, res: Response)=>{
    res.status(200).json({message: "Assaignment GearUp Running....."})
})

app.use("/api/auth", authRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/gear", gearRouter)
app.use("/api/rental", rentelOrderROuter)



app.use(notFound)
app.use(globalErrorHandling)

export default app