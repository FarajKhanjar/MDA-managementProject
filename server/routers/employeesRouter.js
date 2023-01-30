const express = require('express');
const employeesBLL = require('../BLL/employeesBLL');
//const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point 'http://localhost:8080/employees'

// Get all employees
router.route('/').get(async (req, res) => {
  try {
      const filters = req.query;
      console.log(filters);
      const employees = await employeesBLL.getAllEmployees(filters);
      res.json(employees);
  } catch (error) {
    res.json(error);
  }  
});

// Get employee By ID
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
  const employee = await employeesBLL.getEmployeeById(id);
  res.json(employee);
  } catch (error) {
    res.json(error);
  }  
});


// Get employee By startWorkYear
router.route('/byYear/:startWorkYear').get(async (req, res) => {
  try {
    const { startWorkYear } = req.params;
    const employee = await employeesBLL.getEmployeeByStartWorkYear(startWorkYear);
    res.json(employee);
  } catch (error) {
    res.json(error);
  }
});

// Add a employee
router.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    console.log(req.body);
    const result = await employeesBLL.addEmployee(obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// Update a employee
router.route('/:id').put(async (req, res) => {
  try {
      const { id } = req.params;
  const obj = req.body;
  const result = await employeesBLL.updateEmployee(id, obj);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }
});

// Delete a employee
router.route('/:id').delete(async (req, res) => {
  try {
      const { id } = req.params;
  const result = await employeesBLL.deleteEmployee(id);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }
});

module.exports = router;