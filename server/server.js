import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import csrfRoutes from './routes/csrfRoutes.js';
import { connectToDatabase } from './config/db.js';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const app = express();
app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
  }));
  
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', csrfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});