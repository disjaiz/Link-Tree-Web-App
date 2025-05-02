import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 5000 ;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
import cookieParser from 'cookie-parser';
app.use(cookieParser());
import routerUser from './Routes/User.js';
app.use('/user', routerUser);

app.listen(port, () => {
    console.log(`--------------Server running on port ${port}-----------------`);
  });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("LinkTree API is running...");
});

