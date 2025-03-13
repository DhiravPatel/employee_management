import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const YoungestEmployeeChart = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/statistics/youngest-employee`);

        const departments = response.data.map((item) => item.department_name);
        const ages = response.data.map((item) => item.age);
        const employeeNames = response.data.map((item) => item.employee_name);

        setChartData({
          labels: departments,
          datasets: [
            {
              label: "Youngest Employee Age",
              data: ages,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading chart...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full h-[500px]  ">
      <Bar
        data={chartData}
        options={{
          indexAxis: "y", // Makes the bar chart horizontal
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Youngest Employee by Department (Age)",
              font: { size: 16 },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `Age: ${context.raw}`;
                },
                afterLabel: function (context) {
                  return `Employee: ${response.data[context.dataIndex].employee_name}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100, // Extends axis to 150 years
              ticks: {
                stepSize: 10, // Display every 10 years
                callback: function (value) {
                  return value + " yrs"; // Append 'yrs' to tick labels
                },
              },
              title: {
                display: true,
                text: "Age",
              },
            },
            y: {
              title: {
                display: true,
                text: "Department",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default YoungestEmployeeChart;
