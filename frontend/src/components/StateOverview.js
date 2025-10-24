import React from 'react';

const StateOverview = ({ stats, districts }) => {
  if (!stats) return null;

  return (
    <div className="state-overview">
      <div className="overview-header">
        <h2>Uttar Pradesh - MGNREGA Overview</h2>
        <p>Comprehensive performance across all 75 districts</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card large">
          <div className="stat-number">{stats.total_districts}</div>
          <div className="stat-label">Total Districts</div>
        </div>
        
        <div className="stat-card large">
          <div className="stat-number">{stats.total_households_employed?.toLocaleString()}</div>
          <div className="stat-label">Families Employed</div>
        </div>
        
        <div className="stat-card large">
          <div className="stat-number">{stats.total_persondays_generated?.toLocaleString()}</div>
          <div className="stat-label">Work Days Generated</div>
        </div>
        
        <div className="stat-card large">
          <div className="stat-number">{stats.total_families_100_days?.toLocaleString()}</div>
          <div className="stat-label">Families Completed 100 Days</div>
        </div>
      </div>

      <div className="quick-stats">
        <h3>Key Performance Indicators</h3>
        <div className="indicators-grid">
          <div className="indicator">
            <span className="indicator-label">Average Employment per District:</span>
            <span className="indicator-value">
              {Math.round(stats.total_households_employed / stats.total_districts).toLocaleString()} families
            </span>
          </div>
          <div className="indicator">
            <span className="indicator-label">Average Work Days per Family:</span>
            <span className="indicator-value">{stats.average_days_per_household} days</span>
          </div>
          <div className="indicator">
            <span className="indicator-label">100 Days Completion Rate:</span>
            <span className="indicator-value">
              {((stats.total_families_100_days / stats.total_households_employed) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateOverview;