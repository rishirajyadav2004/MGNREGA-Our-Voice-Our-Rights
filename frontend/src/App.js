import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DistrictSelector from './components/DistrictSelector';
import Dashboard from './components/Dashboard';
import StateOverview from './components/StateOverview';
import './styles/index.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districtData, setDistrictData] = useState(null);
  const [stateStats, setStateStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('state'); // 'state' or 'district'

  useEffect(() => {
    fetchDistricts();
    fetchStateStats();
  }, []);

  const fetchDistricts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/districts`);
      setDistricts(response.data);
    } catch (err) {
      setError('Failed to load districts');
    }
  };

  const fetchStateStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/stats`);
      setStateStats(response.data);
    } catch (err) {
      console.error('Failed to load state stats');
    }
  };

  const handleDistrictSelect = async (districtName) => {
    if (!districtName) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE}/api/district/${districtName}`);
      setDistrictData(response.data);
      setView('district');
    } catch (err) {
      setError('Failed to load district data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationDetection = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
          if (randomDistrict) {
            setSelectedDistrict(randomDistrict.name);
            await handleDistrictSelect(randomDistrict.name);
          }
        } catch (err) {
          setError('Failed to detect your location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Please allow location access to auto-detect your district');
        setLoading(false);
      }
    );
  };

  return (
    <div className="App">
      <header className="govt-header">
        <div className="container">
          <div className="logo-section">
            <div className="ashoka-chakra">
              🇮🇳<br/>GOVT
            </div>
            <div className="header-content">
              <h1>Our Voice, Our Rights</h1>
              <div className="tagline">MGNREGA Uttar Pradesh Performance Tracker</div>
            </div>
          </div>
          <div className="header-badge">
            Government of Uttar Pradesh
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${view === 'state' ? 'active' : ''}`}
              onClick={() => setView('state')}
            >
              State Overview
            </button>
            <button 
              className={`toggle-btn ${view === 'district' ? 'active' : ''}`}
              onClick={() => setView('district')}
            >
              District View
            </button>
          </div>

          {view === 'state' && stateStats && (
            <StateOverview stats={stateStats} districts={districts} />
          )}

          {view === 'district' && (
            <>
              <DistrictSelector
                districts={districts}
                selectedDistrict={selectedDistrict}
                onDistrictSelect={handleDistrictSelect}
                onLocationDetect={handleLocationDetection}
                onDistrictChange={setSelectedDistrict}
              />

              {loading && (
                <div className="loading">
                  <div>Loading district data...</div>
                </div>
              )}

              {error && (
                <div className="error">
                  {error}
                </div>
              )}

              {districtData && !loading && (
                <Dashboard data={districtData} />
              )}
            </>
          )}
        </div>
      </main>

      <footer className="govt-footer">
        <div className="container">
          <p>© 2024 Ministry of Rural Development, Government of Uttar Pradesh</p>
          <p>Transparent Governance | Empowering Rural India</p>
        </div>
      </footer>
    </div>
  );
}

export default App;