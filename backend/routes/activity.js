const express = require("express");
const router = new express.Router();
const { Activity } = require("../models/index");

// Your API endpoints should be implemented here

// GET /api/activities
// Returns an array of all activities
router.get("/", async (req, res) => {
  let options = {include: 'location', attributes: { exclude: ['locationId', 'activityId' ]}};
  if (typeof req.query.isActive !== "undefined") {
    const where = {
      where: {
        isActive: JSON.parse(req.query.isActive),
      },
    };
    options = { ...where };
  }
  try {
    const shipments = await Activity.findAll(options);
    res.json(shipments);
  } catch (err) {
    console.info('ERROR: ', err);
    res.status(400).json(err.errors);
  }
});

// POST /api/activities
// Return an object of the new activity
router.post("/", async (req, res) => {
  try {
    const shipment = await Activity.create(req.body);
    res.json(shipment);
  } catch (err) {
    res.status(400).json(err.errors);
  }
});


module.exports = router;
