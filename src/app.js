import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import sessionRouter from "./routes/sessionRoutes.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, PATCH, DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true
}))

app.use("/api/v1", sessionRouter)


app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;