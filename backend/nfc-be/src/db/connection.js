import mongoose from 'mongoose';
import { envConfig } from '../config/envConfig.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envConfig.mongoUri);

    console.log("MongoDB Connected!");
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};