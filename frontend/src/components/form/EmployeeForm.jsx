import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmployeeForm = ({ isOpen, onClose, onSubmit, editData }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department_id: "",
    name: "",
    dob: "",
    phone: "",
    photo: "",
    email: "",
    salary: "",
    status: "active"
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/departments/get-department`
        );
        setDepartments(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching departments:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id,
        department_id: editData.department_id || "",
        name: editData.name || "",
        dob: editData.dob ? editData.dob.split("T")[0] : "",
        phone: editData.phone || "",
        photo: editData.photo
          ? `http://localhost:8080/uploads/${editData.photo}`
          : "",
        email: editData.email || "",
        salary: editData.salary || "",
        status: editData.status || "active"
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photoFile: file,
        photo: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("department_id", formData.department_id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("salary", formData.salary);
    formDataToSend.append("status", formData.status);

    if (formData.photoFile) {
      formDataToSend.append("photo", formData.photoFile);
    } else if (formData.photo) {
      formDataToSend.append("photo", editData.photo);
    }

    try {
      let response;
      if (editData) {
        response = await axios.put(
          `${API_BASE_URL}/employees/edit-employee/${formData.id}`,
          formDataToSend
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}/employees/add-employee`,
          formDataToSend
        );
      }

      toast.success(
        editData
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
      onSubmit();
      onClose();
    } catch (error) {
      console.error(
        "Failed to process employee:",
        error.response?.data?.message || error.message
      );
      toast.error("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      department_id: "",
      name: "",
      dob: "",
      phone: "",
      photo: "",
      email: "",
      salary: "",
      status: "active"
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="mb-2">Department</Label>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="mb-2">Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Date of Birth</Label>
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Phone</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-10 h-10 rounded-full mt-2"
                onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback if image is missing
              />
            )}
          </div>

          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Salary</Label>
            <Input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <Label className="mb-2">Status</Label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="submit">{editData ? "Update" : "Add"}</Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeForm;
