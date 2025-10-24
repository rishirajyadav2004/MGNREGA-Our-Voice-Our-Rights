import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const WorkDurationChart = ({ data }) => {
  const chartData = {
    labels: ['Short Work (1-30 days)', 'Medium Work (31-60 days)', 'Long Work (61-99 days)', 'Full Work (100+ days)'],
    datasets: [
      {
        data: [
          data['1_14_days'].households + data['15_30_days'].households,
          data['31_40_days'].households + data['41_50_days'].households + data['51_60_days'].households,
          data['61_70_days'].households + data['71_80_days'].households + data['81_99_days'].households,
          data['100_days'].households + data['101_150_days'].households
        ],
        backgroundColor: [
          '#FF9800',
          '#2196F3',
          '#9C27B0',
          '#2E7D32'
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF'
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value.toLocaleString()} families (${percentage}%)`;
          }
        }
      }
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default WorkDurationChart;