const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const {ConnectToDatabase} = require('./src/connection/connection');
const employeeRoutes = require('./src/routes/employeeRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const statisticsRoutes = require('./src/routes/statisticsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));
const PORT = 8080;

ConnectToDatabase();

app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/statistics', statisticsRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})