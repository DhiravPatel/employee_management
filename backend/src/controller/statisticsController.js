const { executeQuery } = require("../config/executeQuery");

const getHighestSalaryByDepartment = async (req, res) => {
  const query = `
        SELECT d.name AS department_name, e.name AS employee_name, e.salary
        FROM Employee e
        JOIN Department d ON e.department_id = d.id
        WHERE e.salary = (SELECT MAX(salary) FROM Employee WHERE department_id = e.department_id)
        ORDER BY department_name;
    `;

  try {
    const results = await executeQuery(query);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEmployeeCountBySalaryRange = async (req, res) => {
  const query = `
        SELECT 
            CASE 
                WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
                WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
                ELSE '100000+' 
            END AS salary_range,
            COUNT(*) AS employee_count
        FROM Employee
        GROUP BY salary_range
        ORDER BY salary_range;
    `;

  try {
    const results = await executeQuery(query);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getYoungestEmployeeByDepartment = async (req, res) => {
  const query = `
        SELECT d.name AS department_name, e.name AS employee_name, 
               TIMESTAMPDIFF(YEAR, e.dob, CURDATE()) AS age
        FROM Employee e
        JOIN Department d ON e.department_id = d.id
        WHERE e.dob = (
            SELECT MAX(dob) 
            FROM Employee 
            WHERE department_id = e.department_id
        )
        ORDER BY department_name;
    `;

  try {
    const results = await executeQuery(query);
    res.json(results);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getHighestSalaryByDepartment,
  getEmployeeCountBySalaryRange,
  getYoungestEmployeeByDepartment
};
