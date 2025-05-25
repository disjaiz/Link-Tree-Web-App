import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import routerUser from './Routes/User.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000 ;
app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true, 
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));
app.use(cors({
  origin: 'https://link-tree-web-app-frontend.onrender.com', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// const allowedOrigins = ['http://localhost:5173', 'http://192.168.0.105:5173'];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       // allow requests with no origin (like mobile devices)
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));


app.use(cookieParser());

app.use('/user', routerUser);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===================================================================================
app.listen(port, () => {
    console.log(`--------------Server running on port ${port}-----------------`);
  });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("LinkTree API is running.."); 
});

