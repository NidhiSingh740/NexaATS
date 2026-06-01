// server/server.js


const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const recruiterRoutes = require('./routes/recruiter');
const profileRoutes = require('./routes/profile');


connectDB();

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://nexa-ats.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Blocked by security core protocol: CORS Origin Unauthorized'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 


app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('🚀 ResumeIQ API Backend Is Running Stable and Secure.');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server successfully initialized on port ${PORT}`);
});