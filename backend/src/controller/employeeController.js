const { executeQuery } = require("../config/executeQuery");

const getEmployees = async (req, res) => {
  const getEmployeesQuery = `
    SELECT 
      e.id, e.name, e.dob, e.phone, e.photo, e.email, e.salary, e.status, 
      e.created, e.modified, 
      d.id AS department_id, d.name AS department_name
    FROM Employee e
    LEFT JOIN Department d ON e.department_id = d.id
  `;

  try {
    const employees = await executeQuery(getEmployeesQuery);

    res.status(200).json({
      message: "Employees retrieved successfully",
      data: employees
    });
  } catch (err) {
    console.error("Error retrieving employees:", err);
    res.status(500).json({
      error: "Error retrieving employees",
      details: err.message
    });
  }
};

const addEmployee = async (req, res) => {
  const { department_id, name, dob, phone, email, salary, status } = req.body;
  const photo = req.file ? req.file.filename : null;

  const checkDepartmentQuery = "SELECT id FROM Department WHERE id = ?";

  try {
    const departmentResult = await executeQuery(checkDepartmentQuery, [
      department_id
    ]);

    if (departmentResult.length === 0) {
      return res.status(400).json({
        error: "Invalid department_id",
        message: "The department ID does not exist"
      });
    }

    const insertEmployeeQuery = `
        INSERT INTO Employee (department_id, name, dob, phone, photo, email, salary, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

    const result = await executeQuery(insertEmployeeQuery, [
      department_id,
      name,
      dob,
      phone,
      photo,
      email,
      salary,
      status
    ]);

    res
      .status(201)
      .json({ message: "Employee added successfully", data: result });
  } catch (err) {
    console.error("Error adding employee:", err);
    res
      .status(500)
      .json({ error: "Error adding employee", details: err.message });
  }
};

const editEmployee = async (req, res) => {
  const { id } = req.params;
  const { department_id, name, dob, phone, email, salary, status } = req.body;
  let { photo } = req.body;
  if (req.file) {
    photo = req.file.filename;
  }

  const checkDepartmentQuery = "SELECT id FROM Department WHERE id = ?";
  try {
    const departmentResult = await executeQuery(checkDepartmentQuery, [
      department_id
    ]);

    if (departmentResult.length === 0) {
      return res.status(400).json({
        error: "Invalid department_id",
        message: "The department ID does not exist"
      });
    }
    const query = `
        UPDATE Employee
        SET department_id = ?, name = ?, dob = ?, phone = ?, photo = ?, email = ?, salary = ?, status = ?
        WHERE id = ?
      `;

    const result = await executeQuery(query, [
      department_id,
      name,
      dob,
      phone,
      photo,
      email,
      salary,
      status,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated successfully", data: result });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating employee", details: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Employee WHERE id = ?";
  try {
    const result = await executeQuery(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting employee", details: err.message });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee
};
