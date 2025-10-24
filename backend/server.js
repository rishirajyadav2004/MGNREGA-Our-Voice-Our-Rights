const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Load data
const dataPath = path.join(__dirname, 'data', 'mgnrega_data.json');
const mgnregaData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'MGNREGA Uttar Pradesh API is running!',
    endpoints: {
      '/api/districts': 'Get all districts',
      '/api/district/:name': 'Get specific district data',
      '/api/stats': 'Get overall statistics',
      '/api/top-districts': 'Get top performing districts'
    }
  });
});

// Get all districts (simplified for dropdown)
app.get('/api/districts', (req, res) => {
  const districts = mgnregaData.map(district => ({
    name: district.district,
    households_employed: district.employment_availed_households,
    persondays_generated: district.persondays_generated,
    families_100_days: district.families_completed_100_days
  }));
  res.json(districts);
});

// Get specific district data
app.get('/api/district/:name', (req, res) => {
  const districtName = req.params.name.toUpperCase();
  const district = mgnregaData.find(d => d.district === districtName);
  
  if (!district) {
    return res.status(404).json({ error: 'District not found' });
  }
  
  res.json(district);
});

// Get overall statistics
app.get('/api/stats', (req, res) => {
  const totalHouseholds = mgnregaData.reduce((sum, district) => 
    sum + district.employment_availed_households, 0);
  const totalPersondays = mgnregaData.reduce((sum, district) => 
    sum + district.persondays_generated, 0);
  const total100Days = mgnregaData.reduce((sum, district) => 
    sum + district.families_completed_100_days, 0);
  
  res.json({
    total_districts: mgnregaData.length,
    total_households_employed: totalHouseholds,
    total_persondays_generated: totalPersondays,
    total_families_100_days: total100Days,
    average_days_per_household: Math.round(totalPersondays / totalHouseholds)
  });
});

// Get top performing districts
app.get('/api/top-districts', (req, res) => {
  const topByEmployment = [...mgnregaData]
    .sort((a, b) => b.employment_availed_households - a.employment_availed_households)
    .slice(0, 5);
  
  const topBy100Days = [...mgnregaData]
    .sort((a, b) => b.families_completed_100_days - a.families_completed_100_days)
    .slice(0, 5);

  res.json({
    top_by_employment: topByEmployment,
    top_by_100_days: topBy100Days
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});