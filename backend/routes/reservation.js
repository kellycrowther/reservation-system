const express = require("express");
const router = new express.Router();
const { Reservation } = require("../models/index");

// Your API endpoints should be implemented here

// GET /api/my/reservations
// Returns an array of all reservations
router.get("/", async (req, res) => {
  let options = {};

  try {
    const reservations = await Reservation.findAll(options);
    res.json(reservations);
  } catch (err) {
    console.info('ERROR: ', err);
    res.status(400).json(err.errors);
  }
});

// POST /api/my/reservations
// Return an object of the new reservation
router.post("/", async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.json(reservation);
  } catch (err) {
    res.status(400).json(err.errors);
  }
});


module.exports = router;
