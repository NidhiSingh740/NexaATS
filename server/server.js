

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');


connectDB();

const app = express();

app.use(cors()); 
app.use(express.json()); 


app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('🚀 ResumeIQ API Backend Is Running Stable and Secure.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server runtime listening perfectly on port ${PORT}`);
});