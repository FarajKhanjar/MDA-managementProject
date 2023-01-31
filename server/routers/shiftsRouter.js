const express = require('express');
const shiftsBLL = require('../BLL/shiftsBLL');
//const jwt = require('jsonwebtoken');

const router = express.Router();

// Entry Point 'http://localhost:8080/shifts'

// Get all shifts
router.route('/').get(async (req, res) => {
    try {
        const filters = req.query;
        console.log(filters);
        const shifts = await shiftsBLL.getAllShifts(filters);
        res.json(shifts);
    } catch (error) {
      res.json(error);
    }
    
    });

// Get shift By ID
router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
  const shift = await shiftsBLL.getShiftById(id);
  res.json(shift);
  } catch (error) {
    res.json(error);
  }
  
});

// Get shift By manager
// router.route('/byManager/:manager').get(async (req, res) => {
//   try {
//     const { manager } = req.params;
//     const shift = await shiftsBLL.getShiftByManager(manager);
//     res.json(shift);
//   } catch (error) {
//     res.json(error);
//   }

// });

// Add a shift
router.route('/').post(async (req, res) => {
  try {
    const obj = req.body;
    console.log(req.body);
    const result = await shiftsBLL.addShift(obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }

});

// Update a shift
router.route('/:id').put(async (req, res) => {
  try {
      const { id } = req.params;
  const obj = req.body;
  const result = await shiftsBLL.updateShift(id, obj);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }

});

// Delete a shift
router.route('/:id').delete(async (req, res) => {
  try {
      const { id } = req.params;
  const result = await shiftsBLL.deleteShift(id);
  res.json(result);
  } catch (error) {
    res.json("The error is: "+error.name);
  }

});

module.exports = router;
