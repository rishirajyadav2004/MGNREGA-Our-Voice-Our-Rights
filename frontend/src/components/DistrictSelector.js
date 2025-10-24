import React from 'react';

const DistrictSelector = ({ 
  districts, 
  selectedDistrict, 
  onDistrictSelect, 
  onLocationDetect,
  onDistrictChange 
}) => {
  return (
    <div className="district-selector">
      <h2 className="selector-title">Select Your District</h2>
      <div className="select-wrapper">
        <select
          className="district-select"
          value={selectedDistrict}
          onChange={(e) => {
            onDistrictChange(e.target.value);
            onDistrictSelect(e.target.value);
          }}
        >
          <option value="">Choose your district</option>
          {districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      
      <button 
        className="location-btn"
        onClick={onLocationDetect}
      >
        📍 Detect My District Automatically
      </button>
      
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        Or let us automatically detect your district using your location
      </div>
    </div>
  );
};

export default DistrictSelector;