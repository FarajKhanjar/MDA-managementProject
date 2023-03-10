const Shift = require('../models/shiftModel');
const EmployeeShift = require('../models/employeeShiftModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET - Get All - Read
const getAllShifts = (filters) => {
  //return Shift.find(filters);
  return Shift.aggregate([
    { 
      $lookup :
      {
        from: "employeeshifts",
        localField: "_id",
        foreignField: "shiftID",
        pipeline: [
          {
            $lookup :
            {
              from: "employees",
              localField: "employeeID",
              foreignField: "_id",
              pipeline: [{ 
                  $project : { "departmentID": 0 } 
                }
              ],
              as: "employee"
            }
          }, 
          {
            $project : { "shiftID": 0 , "employeeID": 0}
          }
        ],
        as: "employeesAtShift"
      } 
    },
    { $lookup :
      {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        pipeline: [
          { 
            $project : { "manager": 0} 
          }
        ],
        as: "department"
      } 
    }
  ]);
};

// GET - Get By Id - read
const getShiftById = (id) => {
  return Shift.aggregate([
    { 
      $lookup :
      {
        from: "employeeshifts",
        localField: "_id",
        foreignField: "shiftID",
        pipeline: [
          {
            $lookup :
            {
              from: "employees",
              localField: "employeeID",
              foreignField: "_id",
              pipeline: [{ 
                  $project : { "departmentID": 0 } 
                }
              ],
              as: "employee"
            }
          }, 
          {
            $project : { "shiftID": 0 , "employeeID": 0}
          }
        ],
        as: "employeesAtShift"
      } 
    },
    { $lookup :
      {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        pipeline: [
          { 
            $project : { "manager": 0} 
          }
        ],
        as: "department"
      } 
    },
    {
      $match : {
        _id : ObjectId(id)
      }
    }
  ]);
};

// GET - Get By Department - read & filter
const getShiftByDepartment = (department) => {
  console.log("department ID: "+department)
  return Shift.aggregate([
    {
      $match : {
        department : ObjectId(department)
      }
    },
    { 
      $lookup :
      {
        from: "employeeshifts",
        localField: "_id",
        foreignField: "shiftID",
        pipeline: [
          {
            $lookup :
            {
              from: "employees",
              localField: "employeeID",
              foreignField: "_id",
              pipeline: [{ 
                  $project : { "departmentID": 0 } 
                }
              ],
              as: "employee"
            }
          }, 
          {
            $project : { "shiftID": 0 , "employeeID": 0}
          }
        ],
        as: "employeesAtShift"
      } 
    },
    { $lookup :
      {
        from: "departments",
        localField: "department",
        foreignField: "_id",
        pipeline: [
          { 
            $project : { "manager": 0} 
          }
        ],
        as: "department"
      } 
    }
  ]);
};

// POST - Create
const addShift = async (obj) => {
  const currShift = new Shift(obj);
  await currShift.save();
  return 'Created!';
};

// POST - Create employeeShift
const addEmployeeShift = async (obj) => {
  const currEmployeeShift = new EmployeeShift(obj);
  await currEmployeeShift.save();
  return 'Created!';
};

// PUT - Update
const updateShift = async (id, obj) => {
  await Shift.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// PUT - Update employeeShift
const updateEmployeeShift = async (id, obj) => {
  await EmployeeShift.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteShift = async (id) => {
  await Shift.findByIdAndDelete(id);
  return 'Deleted!';
};

// DELETE - Delete employeeShift
const deleteEmployeeShift = async (id) => {
  await EmployeeShift.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllShifts,
  getShiftById,
  getShiftByDepartment,
  addShift,
  addEmployeeShift,
  updateShift,
  updateEmployeeShift,
  deleteShift,
  deleteEmployeeShift
};