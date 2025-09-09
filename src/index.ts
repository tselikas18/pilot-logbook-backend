import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from '../config';
import routes from './routes';

const app = express();
const databaseURL = config.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// API routes
app.get('/', (req, res) => {
  res.json({
    message: 'Client Manager API is running',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});


app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  });
});

const server  = http.createServer(app);

const PORT = process.env.PORT || config.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(databaseURL);
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});