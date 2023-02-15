const Department = require('../models/departmentModel');
const Employee = require('../models/employeeModel');
const Shift = require('../models/shiftModel');
const EmployeeShift = require('../models/employeeShiftModel');
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
    }, 
    { 
      $lookup :
      {
        from: "employees",
        localField: "_id",
        foreignField: "departmentID",
        pipeline: [
          {
            $project : { "departmentID": 0}
          }
        ],
        as: "employees"
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
      $lookup :
      {
        from: "employees",
        localField: "_id",
        foreignField: "departmentID",
        pipeline: [
          {
            $project : { "departmentID": 0}
          }
        ],
        as: "employees"
      } 
    } 
    , {
      $match : {
        _id : ObjectId(id)
      }
    }
  ]);
};

// GET - Get By depName - read
const getDepartmentByName = (depName) => {
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
      $lookup :
      {
        from: "employees",
        localField: "_id",
        foreignField: "departmentID",
        pipeline: [
          {
            $project : { "departmentID": 0}
          }
        ],
        as: "employees"
      } 
    } 
    , {
      $match : {
        name : depName
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
    }, 
    { 
      $lookup :
      {
        from: "employees",
        localField: "_id",
        foreignField: "departmentID",
        pipeline: [
          {
            $project : { "departmentID": 0}
          }
        ],
        as: "employees"
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
  getEmployeesByDepartment(id);
  await Employee.deleteMany({ departmentID: id });
  await Shift.deleteMany({ department: id });
  return 'Deleted!';

};

async function getEmployeesByDepartment(departmentId) {
  const emps = await Employee.find({ departmentID: departmentId });
  for (let i = 0; i < emps.length; i++) {
    const employeeId = emps[i]._id;
    await EmployeeShift.deleteMany({ employeeID: employeeId });
  }
}

module.exports = {
  getAllDepartments,
  getDepartmentById,
  getDepartmentByName,
  getDepartmentByManager,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};