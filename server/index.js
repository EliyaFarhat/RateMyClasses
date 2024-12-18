import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// routes
import courseRoutes from './routes/coursesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import loginRoutes from './routes/loginRoute.js'


dotenv.config(); // Load .env variables

const app = express();

// Middleware should come BEFORE routes

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON bodies

// Routes come after middleware
app.use('/courses', courseRoutes);
app.use('/users', authRoutes);
app.use('/api', loginRoutes);



const CONNECTION_URL = process.env.MONGO_URI; // Use environment variable
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; // Your secret key for JWT



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log("JWT_SECRET:", JWT_SECRET);
  });
})
  .catch((error) => console.log(error.message));