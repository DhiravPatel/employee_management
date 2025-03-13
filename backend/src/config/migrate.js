const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  multipleStatements: true
});

const sqlFilePath = path.join(
  __dirname,
  "..",
  "migrations/petpooja_employee.sql"
);
const sqlQueries = fs.readFileSync(sqlFilePath, "utf8");

connection.query(sqlQueries, (err, results) => {
  if (err) {
    console.error("Error executing SQL file:", err);
    return;
  }
  console.log("Database migration completed successfully!");
  connection.end();
});
