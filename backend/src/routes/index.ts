import * as express from "express";
const router = express.Router();

const activity = require("./activity");
const user = require("./user");
const reservation = require("./reservation");
const location = require("./location.route");
const schedule = require("./schedule.route");

router.use("/activities", activity);
router.use("/users", user);
router.use("/reservations", reservation);
router.use("/locations", location);
router.use("/schedules", schedule);

module.exports = router;
