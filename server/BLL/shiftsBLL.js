const Shift = require('../models/shiftModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET - Get All - Read
const getAllShifts = (filters) => {
  return Shift.find(filters);
};

// GET - Get By Id - read
const getShiftById = (id) => {
  return Shift.findById({ _id: id });
};

// POST - Create
const addShift = async (obj) => {
  const currShift = new Shift(obj);
  await currShift.save();
  return 'Created!';
};

// PUT - Update
const updateShift = async (id, obj) => {
  await Shift.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteShift = async (id) => {
  await Shift.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllShifts,
  getShiftById,
  addShift,
  updateShift,
  deleteShift,
};