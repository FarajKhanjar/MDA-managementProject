const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema(
  {
    name: String,
    manager: mongoose.Schema.Types.ObjectId
  },
  { versionKey: false }
);

const department = mongoose.model('departments', departmentSchema);

module.exports = department;