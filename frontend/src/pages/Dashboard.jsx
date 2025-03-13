import React from "react";
import EmployeeSalaryChart from "../components/Barchart/EmployeeSalaryChart";
import EmployeeSalaryRangeChart from "@/components/Barchart/EmployeeSalaryRangeChart ";
import YoungestEmployeeChart from "@/components/Barchart/YoungestEmployeeChart ";

const Dashboard = () => {
  return (
    <div className="w-full">
      <div className="flex w-full gap-3">
        <EmployeeSalaryChart />
        <EmployeeSalaryRangeChart />
      </div>
      <div>
        <YoungestEmployeeChart />
      </div>
    </div>
  );
};

export default Dashboard;
