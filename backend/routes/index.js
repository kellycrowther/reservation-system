const express = require("express");
const router = new express.Router();

const activity = require("./activity");
const user = require("./user");
const reservation = require("./reservation");
const location = require("./location.route");

router.use("/activities", activity);
router.use("/users", user);
router.use("/reservations", reservation);
router.use("/locations", location);

module.exports = router;
