const express = require('express');
const router = express.Router();
const { getHighestSalaryByDepartment, getEmployeeCountBySalaryRange, getYoungestEmployeeByDepartment } = require('../controller/statisticsController');

router.get('/highest-salary', getHighestSalaryByDepartment);
router.get('/employee-count', getEmployeeCountBySalaryRange);
router.get('/youngest-employee', getYoungestEmployeeByDepartment);


module.exports = router;    
