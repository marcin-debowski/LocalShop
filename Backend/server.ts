import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} 🚀`);
        });
    }).catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    });