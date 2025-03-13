import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";

// Register necessary components and plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const EmployeeSalaryRangeChart = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/statistics/employee-count`);
        const salaryRanges = response.data.map((item) => item.salary_range);
        const employeeCounts = response.data.map((item) => item.employee_count);
        const totalEmployees = employeeCounts.reduce((acc, count) => acc + count, 0);

        setChartData({
          labels: salaryRanges,
          datasets: [
            {
              label: "Employee Count",
              data: employeeCounts,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              borderColor: ["#FFFFFF"],
              borderWidth: 2,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading chart...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md  h-[450px] ">
      <h2 className="text-lg font-semibold text-center mb-4">Employee Count by Salary Range</h2>
      <Pie
        data={chartData}
        options={{
          // responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: { size: 14 },
                color: "#333",
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const count = tooltipItem.raw;
                  const percentage = ((count / chartData.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                  return `${tooltipItem.label}: ${count} employees (${percentage}%)`;
                },
              },
            },
            datalabels: {
              color: "#000",
              anchor: "end",
              align: "start",
              formatter: (value, context) => {
                const percentage = ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                return `${value} (${percentage}%)`;
              },
              font: {
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default EmployeeSalaryRangeChart;
