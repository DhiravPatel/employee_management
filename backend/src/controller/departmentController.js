const { executeQuery } = require("../config/executeQuery");

const addDepartment = async (req, res) => {
  const { name, status } = req.body;
  const query = `
      INSERT INTO Department (name, status)
      VALUES (?, ?)
    `;
  try {
    const result = await executeQuery(query, [name, status]);
    res.status(201).json({
      message: "Department added successfully",
      departmentId: result.insertId
    });
  } catch (err) {
    console.error("Error adding department:", err);
    res.status(500).json({
      error: "Error adding department",
      details: err.message
    });
  }
};

const getDepartments = async (req, res) => {
  const query = `
      SELECT id, name, status, created, modified
      FROM Department
    `;
  try {
    const departments = await executeQuery(query);

    if (departments.length === 0) {
      return res.status(404).json({
        message: "No departments found"
      });
    }

    res.status(200).json({
      message: "Departments retrieved successfully",
      data: departments
    });
  } catch (err) {
    console.error("Error retrieving departments:", err);
    res.status(500).json({
      error: "Error retrieving departments",
      details: err.message
    });
  }
};

module.exports = { addDepartment, getDepartments };
