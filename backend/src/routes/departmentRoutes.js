const express = require('express');
const router = express.Router();
const { addDepartment, getDepartments } = require('../controller/departmentController'); 

router.post('/add-department', addDepartment);
router.get('/get-department', getDepartments);

module.exports = router;
