import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary components in Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeSalaryChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/statistics/highest-salary`);
        const data = response.data;

        const departmentNames = data.map((item) => item.department_name);
        const salaries = data.map((item) => parseFloat(item.salary));
        const employeeNames = data.map((item) => item.employee_name);

        setChartData({
          labels: departmentNames,
          datasets: [
            {
              label: 'Highest Salary',
              data: salaries,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Department-wise Highest Salary of Employees',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${employeeNames[tooltipItem.dataIndex]}: $${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white h-[450px] rounded-lg  shadow-md p-4">
      {loading ? (
        <p>Loading chart data...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <Bar data={chartData} options={options} style={{height:"400px", }} />
      )}
    </div>
  );
};

export default EmployeeSalaryChart;