const Department = require('../models/departmentModel');

// GET - Get All - Read
const getAllDepartments = (filters) => {
  return Department.find(filters);
};

// GET - Get By Id - read
const getDepartmentById = (id) => {
  return Department.findById({ _id: id });
};

// GET - Get By Manager - read & filter
const getDepartmentByManager = (manager) => {
  return Department.find({ manager: manager });
};

// POST - Create
const addDepartment = async (obj) => {
  const currDepartment = new Department(obj);
  await currDepartment.save();
  return 'Created!';
};

// PUT - Update
const updateDepartment = async (id, obj) => {
  await Department.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteDepartment = async (id) => {
  await Department.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getDepartmentByManager,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};