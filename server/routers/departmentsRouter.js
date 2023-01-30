const express = require('express');
const departmentsBLL = require('../BLL/departmentsBLL');
//const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point 'http://localhost:8080/departments'

// Get all departments
router.route('/').get(async (req, res) => {
    try {
        const filters = req.query;
        console.log(filters);
        const departments = await departmentsBLL.getAllDepartments(filters);
        res.json(departments);
    } catch (error) {
      res.json(error);
    }
    
    });

// Get department By ID
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
  const department = await departmentsBLL.getDepartmentById(id);
  res.json(department);
  } catch (error) {
    res.json(error);
  }
  
});

// Get department By manager
router.route('/byManager/:manager').get(async (req, res) => {
  try {
    const { manager } = req.params;
    const department = await departmentsBLL.getDepartmentByManager(manager);
    res.json(department);
  } catch (error) {
    res.json(error);
  }

});

// Add a department
router.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    console.log(req.body);
    const result = await departmentsBLL.addDepartment(obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }

});

// Update a department
router.route('/:id').put(async (req, res) => {
  try {
      const { id } = req.params;
  const obj = req.body;
  const result = await departmentsBLL.updateDepartment(id, obj);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }

});

// Delete a department
router.route('/:id').delete(async (req, res) => {
  try {
      const { id } = req.params;
  const result = await departmentsBLL.deleteDepartment(id);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }

});

module.exports = router;
