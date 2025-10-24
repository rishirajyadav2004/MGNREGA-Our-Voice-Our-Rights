import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ data }) => {
  if (!data) return null;

  // Employment comparison chart
  const employmentData = {
    labels: ['Demanded', 'Offered', 'Availed'],
    datasets: [
      {
        label: 'Households',
        data: [
          data.employment_demanded_households,
          data.employment_offered_households,
          data.employment_availed_households
        ],
        backgroundColor: ['#FF9800', '#2196F3', '#4CAF50'],
      },
    ],
  };

  // Beneficiary distribution
  const beneficiaryData = {
    labels: ['SC Families', 'ST Families', 'Other Families'],
    datasets: [
      {
        data: [
          data.sc_beneficiaries_households,
          data.st_beneficiaries_households,
          data.others_beneficiaries_households
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      },
    ],
  };

  const employmentOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Employment Demand vs Availability',
      },
    },
  };

  const beneficiaryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Add this new chart for employment trends
const trendData = {
  labels: ['Job Cards', 'Employment', '100 Days', 'Benefits'],
  datasets: [
    {
      label: 'Current Performance',
      data: [
        data.no_of_registered / 1000,
        data.employment_availed_households / 100,
        data.families_completed_100_days,
        data.disabled_beneficiaries * 10
      ],
      backgroundColor: 'rgba(0, 200, 151, 0.8)',
      borderColor: '#00C897',
      borderWidth: 2,
    },
  ],
};

const trendOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Performance Indicators',
      color: '#E8E8E8'
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#A0A0A0'
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      },
      ticks: {
        color: '#A0A0A0'
      }
    }
  }
};

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>{data.district} District</h2>
        <p>Comprehensive MGNREGA Performance Report</p>
      </div>

      {/* Main Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">
            {data.employment_availed_households?.toLocaleString()}
          </div>
          <div className="stat-label">Families Employed</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.persondays_generated?.toLocaleString()}
          </div>
          <div className="stat-label">Work Days Generated</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.families_completed_100_days?.toLocaleString()}
          </div>
          <div className="stat-label">Completed 100 Days</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.disabled_beneficiaries?.toLocaleString()}
          </div>
          <div className="stat-label">Disabled Beneficiaries</div>
        </div>
      </div>

      {/* Job Card Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">
            {data.no_of_registered?.toLocaleString()}
          </div>
          <div className="stat-label">Registered Job Cards</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.cumulative_hh_issued_jobcards?.toLocaleString()}
          </div>
          <div className="stat-label">Job Cards Issued</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.no_of_jobcard_deleted?.toLocaleString()}
          </div>
          <div className="stat-label">Job Cards Deleted</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-number">
            {data.no_of_jobcard_included?.toLocaleString()}
          </div>
          <div className="stat-label">Job Cards Included</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-row">
          <div className="chart-container">
            <h3 className="chart-title">Employment Status</h3>
            <Bar data={employmentData} options={employmentOptions} />
          </div>
          
          <div className="chart-container">
            <h3 className="chart-title">Beneficiary Distribution</h3>
            <Doughnut data={beneficiaryData} options={beneficiaryOptions} />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="additional-info">
        <h3>Additional Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Persondays Central Liability:</span>
            <span className="info-value">{data.persondays_central_liability}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Land Reform Beneficiaries:</span>
            <span className="info-value">{data.hh_land_reform_beneficiaries}</span>
          </div>
          <div className="info-item">
            <span className="info-label">SC Persons Benefited:</span>
            <span className="info-value">{data.sc_beneficiaries_persons?.toLocaleString()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">ST Persons Benefited:</span>
            <span className="info-value">{data.st_beneficiaries_persons?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;