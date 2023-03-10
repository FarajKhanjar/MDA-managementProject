const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    date: Date,
    startingHour: String,
    endingHour: String,
    department: mongoose.Schema.Types.ObjectId
  },
  { versionKey: false }
);

const shift = mongoose.model('shifts', shiftSchema);

module.exports = shift;