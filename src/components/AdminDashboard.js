import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns'; // Add this import
import { enUS } from 'date-fns/locale'; // Add this import
import visitorLogData from './helpers/visitorLog.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TimeScale,
  ChartDataLabels
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    visitorCount: 0,
    topCategory: '',
    topKeyword: '',
    dailyVisits: [],
    categories: {},
    searchWords: {},
  });

  useEffect(() => {
    const weeklyStats = visitorLogData.weeklyStats;
    const dailyStats = visitorLogData.dailyStats;

    const topCategory = Object.entries(weeklyStats.categories).reduce((a, b) => a[1] > b[1] ? a : b);
    const topKeyword = Object.entries(weeklyStats.searchWords).reduce((a, b) => a[1] > b[1] ? a : b);

    setStats({
      visitorCount: weeklyStats.visitorCount,
      topCategory: `${topCategory[0]} (${((topCategory[1] / weeklyStats.visitorCount) * 100).toFixed(1)}%)`,
      topKeyword: `${topKeyword[0]} (${((topKeyword[1] / weeklyStats.visitorCount) * 100).toFixed(1)}%)`,
      dailyVisits: dailyStats.map(day => ({ x: day.date, y: day.visitorCount })),
      categories: weeklyStats.categories,
      searchWords: weeklyStats.searchWords,
    });
  }, []);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Visitors',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d'
          }
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Visitor Count'
        },
        beginAtZero: true
      }
    }
  };

  const lineChartData = {
    datasets: [
      {
        label: 'Daily Visitors',
        data: stats.dailyVisits,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          font: {
            size: 10
          }
        }
      },
      title: {
        display: true,
        text: 'Search Categories',
        font: {
          size: 16
        },
        align: 'start', // This aligns the title to the left
        padding: {
          top: 10,
          bottom: 30
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          const datapoints = ctx.chart.data.datasets[0].data;
          const total = datapoints.reduce((total, datapoint) => total + datapoint, 0);
          const percentage = (value / total * 100).toFixed(1);
          return percentage > 5 ? percentage + '%' : ''; // Only show if > 5%
        },
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        anchor: 'center',
        align: 'center',
      }
    },
    layout: {
      padding: {
        top: 30 // Add some top padding to make room for the title
      }
    }
  };

  const keywordPieChartOptions = {
    ...pieChartOptions,
    plugins: {
      ...pieChartOptions.plugins,
      title: {
        ...pieChartOptions.plugins.title,
        text: 'Search Keywords'
      }
    }
  };

  const pieChartData = {
    labels: Object.keys(stats.categories),
    datasets: [
      {
        data: Object.values(stats.categories),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const keywordPieChartData = {
    labels: Object.keys(stats.searchWords),
    datasets: [
      {
        data: Object.values(stats.searchWords),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <div className="stats-container">
        <div className="stat-box1">
          <h4>Visitor Count (This Week)</h4>
          <h2>{stats.visitorCount}</h2>
        </div>
        <div className="stat-box2">
          <h4>Most Frequent Search Category</h4>
          <h2>{stats.topCategory}</h2>
        </div>
        <div className="stat-box3">
          <h4>Most Frequent Search Keyword</h4>
          <h2>{stats.topKeyword}</h2>
        </div>
      </div>
      <div className="pie-charts-container">
        <div className="pie-chart-container">
          <Pie options={pieChartOptions} data={pieChartData} />
        </div>
        <div className="pie-chart-container">
          <Pie options={keywordPieChartOptions} data={keywordPieChartData} />
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-container line-chart-container">
          <Line options={lineChartOptions} data={lineChartData} height={400} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;