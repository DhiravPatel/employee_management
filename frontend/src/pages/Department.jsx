import { useState, useEffect } from "react";
import DepartmentTable from '@/components/custom/DepartmentTable';
import axios from "axios";
import AddDepartmentForm from "@/components/form/DepartmentForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/departments/get-department`);
      setDepartments(response.data.data);
      setFilteredDepartments(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchTerm, departments]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openAddForm = () => {
    setIsAddFormOpen(true);
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleAddDepartment = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/departments/add-department`, formData);
      if (response.status === 201) {
        fetchDepartments();
        closeAddForm();
      }
    } catch (err) {
      console.error("Failed to add department:", err);
    }
  };

  return (
    <div>
      <DepartmentTable
        departments={filteredDepartments}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddClick={openAddForm}
      />
      <AddDepartmentForm
        isOpen={isAddFormOpen}
        onClose={closeAddForm}
        onSubmit={handleAddDepartment}
      />
    </div>
  );
};

export default Department;
