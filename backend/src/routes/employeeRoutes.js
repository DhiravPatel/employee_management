const express = require('express');
const router = express.Router();
const { addEmployee, editEmployee, deleteEmployee, getEmployees } = require('../controller/employeeController');
const uploadImage = require('../middleware/uploadMiddleware');

router.get('/get-employee', getEmployees);
router.post('/add-employee', uploadImage, addEmployee);
router.put('/edit-employee/:id',uploadImage, editEmployee);
router.delete('/delete-employee/:id', deleteEmployee);

module.exports = router;
