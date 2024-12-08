import express from "express";
import cors from "cors";
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import task from "./routes/task.js";
import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Use environment variable for secret
const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(cookieParser());
app.use(express.json()); // Ensure you can parse JSON bodies

// Initialize CSRF protection middleware
const csrfProtection = csurf({ 
  cookie: {
      httpOnly: true, // Prevent JavaScript access (enhances security)
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Prevent CSRF attacks
      maxAge: 60 * 15 // Set token expiration time (15 minutes)
  }
});

// Use CSRF protection middleware for specific routes
app.get('/csrf-token', csrfProtection, (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Route to handle tasks
app.use("/task", csrfProtection, task); // Protect task routes with CSRF

const users = [
  { id: 1, email: 'test@example.com', password: 'password1' },
  { id: 2, email: 'engthyda@gmail.com', password: 'password2' }
];

// Login route to generate JWT token
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY);
  res.json({ token });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log('Token received:', token); // Debug log
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
          console.error('Token verification error:', err); // Debug log
          return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = decoded.userId; // Store userId for later use
      next();
  });
}


// Protect routes that need authentication
app.use('/task', verifyToken, task); // Ensure JWT verification for task routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});