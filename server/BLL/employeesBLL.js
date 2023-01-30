const Employee = require('../models/employeeModel');

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
      },
      { 
        $project : { "departmentID": 0 } 
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
  return Employee.findById({ _id: id });
};

// GET - Get By Start Work Year - read & filter
const getEmployeeByStartWorkYear = (startWorkYear) => {
  return Employee.find({ startWorkYear: startWorkYear });
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
  addEmployee,
  updateEmployee,
  deleteEmployee,
};