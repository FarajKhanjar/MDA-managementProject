const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: String
  },
  { versionKey: false }
);

const employee = mongoose.model('employees', employeeSchema);

module.exports = employee;