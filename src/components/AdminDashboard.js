import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    visitorCount: 0,
    topCategory: '',
    topKeyword: '',
    dailyVisits: [],
    dailyCategories: [],
    dailySearches: [],
  });

  useEffect(() => {
    // Fetch data from your API here
    // For now, we'll use mock data
    const mockData = {
      visitorCount: 1134,
      topCategory: 'Geology',
      topKeyword: 'Rocks',
      dailyVisits: [100, 120, 115, 130, 140, 135, 150],
      dailyCategories: [50, 60, 55, 70, 65, 75, 80],
      dailySearches: [200, 220, 210, 240, 230, 250, 260],
    };
    setStats(mockData);
  }, []);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Statistics',
      },
    },
  };

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Daily Visits',
        data: stats.dailyVisits,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Daily Category Searches',
        data: stats.dailyCategories,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Daily Searches',
        data: stats.dailySearches,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="stats-container">
        <div className="stat-box1" style={{color: 'white'}}>
          <h4>Visitor Count (This Week)</h4>
          <h2>{stats.visitorCount}</h2>
        </div>
        <div className="stat-box2" style={{color: 'white'}}>
          <h4>Most Frequent Search Category</h4>
          <h2>{stats.topCategory}</h2>
        </div>
        <div className="stat-box3" style={{color: 'white'}}>
          <h4>Most Frequent Search Keyword</h4>
          <h2>{stats.topKeyword}</h2>
        </div>
      </div>
      <div className="chart-container">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}

export default AdminDashboard;