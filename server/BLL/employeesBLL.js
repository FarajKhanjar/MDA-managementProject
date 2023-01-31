const Employee = require('../models/employeeModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


// GET - Get All - Read
const getAllEmployees = (filters) => { 
  //Employee.find(filters);
  return Employee.aggregate(
    [
      { $lookup :
        {
          from: "departments",
          localField: "departmentID",
          foreignField: "_id",
          pipeline: [
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
          ],
          as: "department"
        } 
      }
      ,{ 
        $project : { "departmentID": 0 } 
      }
      , { $lookup :
        {
          from: "employeeShifts",
          localField: "_id",
          foreignField: "employeeID",
          pipeline: [
            {
              $lookup :
              {
                from: "shifts",
                localField: "shiftID",
                foreignField: "_id",
                pipeline: [
                  {
                    $project : { "department": 0 }
                  }
                ],
                as: "shift"
              }
            } , {
              $project : { "_id": 0 , "employeeID": 0 , "shiftID": 0}
            }
          ],
          as: "shifts"
        } 
      }
  //  ,{
  //   $match :  {
  //     startWorkYear : 2014
  //   } 
  //  }
])
}

// GET - Get By Id - read
const getEmployeeById = (id) => {
  return Employee.aggregate(
    [
      { $lookup :
        {
          from: "departments",
          localField: "departmentID",
          foreignField: "_id",
          pipeline: [
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
          ],
          as: "department"
        } 
      }
      ,{ 
        $project : { "departmentID": 0 } 
      } , { $lookup :
        {
          from: "employeeShifts",
          localField: "_id",
          foreignField: "employeeID",
          pipeline: [
            {
              $lookup :
              {
                from: "shifts",
                localField: "shiftID",
                foreignField: "_id",
                pipeline: [
                  {
                    $project : { "department": 0 }
                  }
                ],
                as: "shift"
              }
            } , {
              $project : { "_id": 0 , "employeeID": 0 , "shiftID": 0}
            }
          ],
          as: "shifts"
        } 
      }
      ,{
        $match :  
        {
          _id : ObjectId(id)
        } 
      }
    ]
  );
};

// GET - Get By Start Work Year - read & filter
const getEmployeeByStartWorkYear = (year) => {
  console.log(year)
  return Employee.aggregate(
    [
      { $lookup :
        {
          from: "departments",
          localField: "departmentID",
          foreignField: "_id",
          pipeline: [
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
          ],
          as: "department"
        } 
      }
      ,{ 
        $project : { "departmentID": 0 } 
      } , { $lookup :
        {
          from: "employeeShifts",
          localField: "_id",
          foreignField: "employeeID",
          pipeline: [
            {
              $lookup :
              {
                from: "shifts",
                localField: "shiftID",
                foreignField: "_id",
                pipeline: [
                  {
                    $project : { "department": 0 }
                  }
                ],
                as: "shift"
              }
            } , {
              $project : { "_id": 0 , "employeeID": 0 , "shiftID": 0}
            }
          ],
          as: "shifts"
        } 
      }
      ,{
        $match :  
        {
          startWorkYear : Number(year)
        } 
      }
    ]
  );
};

// GET - Get By DepartmentID - read & filter
const getEmployeeByDepartmentID = (departmentId) => {
  console.log(departmentId)
  return Employee.aggregate(
    [
      { $lookup :
        {
          from: "departments",
          localField: "departmentID",
          foreignField: "_id",
          pipeline: [
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
          ],
          as: "department"
        } 
      }
      // ,{ 
      //   $project : { "departmentID": 0 } 
      // }
      , { $lookup :
        {
          from: "employeeShifts",
          localField: "_id",
          foreignField: "employeeID",
          pipeline: [
            {
              $lookup :
              {
                from: "shifts",
                localField: "shiftID",
                foreignField: "_id",
                pipeline: [
                  {
                    $project : { "department": 0 }
                  }
                ],
                as: "shift"
              }
            } , {
              $project : { "_id": 0 , "employeeID": 0 , "shiftID": 0}
            }
          ],
          as: "shifts"
        } 
      }
      ,{
        $match :  
        {
          departmentID : ObjectId(departmentId)
        } 
      }
    ]
  );
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
  getEmployeeByStartWorkYear,
  getEmployeeByDepartmentID,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};