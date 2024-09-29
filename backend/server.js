const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Supabase setup (ensure your supabaseClient.js is properly set up)
const supabase = require('./config/supabaseClient');

// Routes
app.use('/api/auth', require('./routes/auth'));
 // Updated to authRoutes.js
// Add more routes as needed

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
