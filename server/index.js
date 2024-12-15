import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// routes
import courseRoutes from './routes/courses.js'

dotenv.config(); // Load .env variables

const app = express();

// Middleware should come BEFORE routes

app.use(cors());

// Routes come after middleware
app.use('/courses', courseRoutes);
app.use('/api/auth', authRoutes);


const CONNECTION_URL = process.env.MONGO_URI; // Use environment variable
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));