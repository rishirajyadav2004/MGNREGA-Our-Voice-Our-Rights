const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: [
    'https://mgnrega-frontend-up.onrender.com',
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

// Load data with error handling
let mgnregaData = [];
try {
  const dataPath = path.join(__dirname, 'data', 'mgnrega_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  mgnregaData = JSON.parse(rawData);
  console.log(`✅ Loaded data for ${mgnregaData.length} districts`);
} catch (error) {
  console.error('❌ Error loading data:', error.message);
  // Create fallback data to prevent crashes
  mgnregaData = [{ district: "SAMPLE", households_employed: 0, persondays_generated: 0 }];
}

// Health check endpoint (CRITICAL for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 MGNREGA Uttar Pradesh API is running!',
    timestamp: new Date().toISOString(),
    endpoints: {
      '/health': 'Health check',
      '/api/districts': 'Get all districts',
      '/api/district/:name': 'Get specific district data',
      '/api/stats': 'Get overall statistics'
    }
  });
});

// Get all districts
app.get('/api/districts', (req, res) => {
  try {
    const districts = mgnregaData.map(district => ({
      name: district.district,
      households_employed: district.employment_availed_households || 0,
      persondays_generated: district.persondays_generated || 0,
      families_100_days: district.families_completed_100_days || 0
    }));
    res.json(districts);
  } catch (error) {
    console.error('Error in /api/districts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific district data
app.get('/api/district/:name', (req, res) => {
  try {
    const districtName = req.params.name.toUpperCase();
    const district = mgnregaData.find(d => d.district === districtName);
    
    if (!district) {
      return res.status(404).json({ error: `District '${districtName}' not found` });
    }
    
    res.json(district);
  } catch (error) {
    console.error('Error in /api/district:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get overall statistics
app.get('/api/stats', (req, res) => {
  try {
    const totalHouseholds = mgnregaData.reduce((sum, district) => 
      sum + (district.employment_availed_households || 0), 0);
    const totalPersondays = mgnregaData.reduce((sum, district) => 
      sum + (district.persondays_generated || 0), 0);
    const total100Days = mgnregaData.reduce((sum, district) => 
      sum + (district.families_completed_100_days || 0), 0);
    
    res.json({
      total_districts: mgnregaData.length,
      total_households_employed: totalHouseholds,
      total_persondays_generated: totalPersondays,
      total_families_100_days: total100Days,
      average_days_per_household: totalHouseholds > 0 ? Math.round(totalPersondays / totalHouseholds) : 0
    });
  } catch (error) {
    console.error('Error in /api/stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server with proper error handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 Health check: http://0.0.0.0:${PORT}/health`);
}).on('error', (error) => {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;