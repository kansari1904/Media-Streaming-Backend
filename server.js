import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDB from "./config/db.js";
import authRouter from './routes/authRoute.js'
import mediaRouter from './routes/mediaRoute.js'
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 3000

//db connection
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins,
    credentials : true
}));

app.use("/auth", authRouter);
app.use("/media", mediaRouter);



app.listen(PORT, () => {
    console.log(`server is started at ${PORT}...`)
})

