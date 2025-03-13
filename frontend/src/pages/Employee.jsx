import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmployeeForm from "@/components/form/EmployeeForm";
import EmployeeTable from "@/components/custom/EmployeeTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 9;

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/employees/get-employee`
      );
      setEmployees(response.data.data);
      setFilteredEmployees(response.data.data); 
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsAddFormOpen(true);
  };

  const handleFormClose = () => {
    setIsAddFormOpen(false);
    setEditingEmployee(null);
  };

  const confirmDelete = (id) => {
    setSelectedEmployeeId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_BASE_URL}/employees/delete-employee/${selectedEmployeeId}`
      );
      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedEmployeeId(null);
    }
  };

  const generatePageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, "ellipsis", currentPage, "ellipsis", totalPages];
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <main className="flex-1 p-6 w-full overflow-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">Employee Management</h1>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search employees..."
              className="w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={() => setIsAddFormOpen(true)}>Add Employee</Button>
          </div>
        </div>

        {loading && <p className="text-center mt-4">Loading employees...</p>}
        {error && (
          <p className="text-center text-red-600 mt-4">Error: {error}</p>
        )}

        {!loading && !error && (
          <EmployeeTable
            employees={paginatedEmployees}
            totalPages={totalPages}
            currentPage={currentPage}
            handleEdit={handleEdit}
            handleDelete={confirmDelete}
            generatePageNumbers={generatePageNumbers}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      <EmployeeForm
        isOpen={isAddFormOpen}
        onClose={handleFormClose}
        onSubmit={fetchEmployees}
        editData={editingEmployee}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={() => setIsDeleteDialogOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this employee?</p>
          <DialogFooter>
            <Button type="button" onClick={handleDelete} className="bg-red-600">
              Delete
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employee;
