import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDb from './database/db.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//using middleware
app.use(express.json());
app.use(cors())
//importing routes
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});