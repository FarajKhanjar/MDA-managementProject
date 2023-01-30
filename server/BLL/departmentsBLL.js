const Department = require('../models/departmentModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET - Get All - Read
const getAllDepartments = () => {
  return Department.aggregate([
    { 
      $lookup :
      {
        from: "employees",
        localField: "manager",
        foreignField: "_id",
        pipeline: [
          {
            $project : { "departmentID": 0 }
          }
        ],
        as: "manager"
      } 
    }
  ]);
};

// GET - Get By Id - read
const getDepartmentById = (id) => {
  return Department.aggregate([
    { 
      $lookup :
      {
        from: "employees",
        localField: "manager",
        foreignField: "_id",
        pipeline: [
          {
            $project : { "departmentID": 0 }
          }
        ],
        as: "manager"
      } 
    },
    {
      $match : {
        _id : ObjectId(id)
      }
    }
  ]);
};

// GET - Get By Manager - read & filter
const getDepartmentByManager = (manager) => {
  console.log(manager)
  return Department.aggregate([
    {
      $match : {
        manager : ObjectId(manager)
      }
    },
    { 
      $lookup :
      {
        from: "employees",
        localField: "manager",
        foreignField: "_id",
        pipeline: [
          {
            $project : { "departmentID": 0 }
          }
        ],
        as: "manager"
      } 
    }
  ]);
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