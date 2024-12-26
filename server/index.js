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



app.use(cors({
  origin: '*', 
}));


app.use(express.json()); 

// Routes come after middleware
app.use('/courses', courseRoutes);
app.use('/users', authRoutes);
app.use('/api', loginRoutes);



const CONNECTION_URL = process.env.MONGO_URI; 
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET; 



mongoose.connect(CONNECTION_URL)
.then(() => {
  app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);

  });
})
  .catch((error) => console.log(error.message));