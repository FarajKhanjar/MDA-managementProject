const mongoose = require('mongoose');

const employeeShiftSchema = new mongoose.Schema(
  {
    employeeID: mongoose.Schema.Types.ObjectId,
    shiftID: mongoose.Schema.Types.ObjectId
  },
  { versionKey: false }
);

const employeeShift = mongoose.model('employeeShifts', employeeShiftSchema);

module.exports = employeeShift;