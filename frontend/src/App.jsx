import { Routes, Route } from "react-router-dom";
import StaticSidebar from "./components/custom/StaticSidebar";
import Employee from "./pages/Employee";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex w-full">
      <ToastContainer position="top-right" autoClose={2000} />
      <StaticSidebar />
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/departments" element={<Department />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
