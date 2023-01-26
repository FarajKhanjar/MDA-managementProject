const Employee = require('../models/employeeModel');

// GET - Get All - Read
const getAllEmployees = (filters) => {
  return Employee.find(filters);
};

// GET - Get By Id - read
const getEmployeeById = (id) => {
  return Employee.findById({ _id: id });
};

// GET - Get By Director - read & filter
const getEmployeeByDirector = (director) => {
  return Employee.find({ director: director });
};

// POST - Create
const addEmployee = async (obj) => {
  const currEmployee = new Employee(obj);
  await currEmployee.save();
  return 'Created!';
};

// PUT - Update
const updateEmployee = async (id, obj) => {
  await Employee.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteEmployee = async (id) => {
  await Employee.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getEmployeeByDirector,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};