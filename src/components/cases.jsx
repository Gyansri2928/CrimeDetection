import React from 'react';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Cases = () => {
  // Line Chart Data for Crime Trends
  const lineData = {
    labels: ['2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Crime Rates',
        data: [500, 600, 550, 700, 800],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  // Pie Chart Data for Crime Type Distribution
  const pieData = {
    labels: ['Theft', 'Assault', 'Burglary', 'Vandalism', 'Fraud'],
    datasets: [
      {
        label: 'Crime Types',
        data: [30, 20, 15, 10, 25],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverOffset: 4,
      },
    ],
  };

  // Bar Graph Data for Solved vs Unsolved Cases
  const barData = {
    labels: ['Theft', 'Assault', 'Burglary', 'Vandalism', 'Fraud'],
    datasets: [
      {
        label: 'Solved Cases',
        data: [25, 15, 10, 8, 18],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Unsolved Cases',
        data: [5, 5, 5, 2, 7],
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
      },
    ],
  };

  // Doughnut Chart Data for Accuracy
  const doughnutData = {
    labels: ['Model Accuracy', 'Inaccuracy'],
    datasets: [
      {
        label: 'Accuracy',
        data: [85, 15],
        backgroundColor: ['#4BC0C0', '#FF6384'],
      },
    ],
  };

  return (
    <div className="max-w-[1340px] m-auto px-4 py-16 bg-gradient-to-b from-gray-800 to-gray-900 text-white" id="cases">
      <h2 className="text-center text-blue-300 font-bold text-5xl mb-12" id="cases-title">Cases and Crime Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Crime Trends Line Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg" id="crime-trends">
          <h3 className="text-center text-2xl font-bold mb-4 text-blue-300">Crime Trends (2019-2023)</h3>
          <Line data={lineData} />
        </div>

        {/* Crime Type Distribution Pie Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg" id="crime-distribution">
          <h3 className="text-center text-2xl font-bold mb-4 text-blue-300">Crime Type Distribution</h3>
          <Pie data={pieData} />
        </div>

        {/* Solved vs Unsolved Bar Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg" id="solved-vs-unsolved">
          <h3 className="text-center text-2xl font-bold mb-4 text-blue-300">Solved vs Unsolved Cases</h3>
          <Bar data={barData} />
        </div>

        {/* Accuracy Doughnut Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg" id="accuracy-chart">
          <h3 className="text-center text-2xl font-bold mb-4 text-blue-300">Detection Model Accuracy</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Cases;
