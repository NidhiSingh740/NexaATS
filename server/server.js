

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

app.use(cors()); 
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