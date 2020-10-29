const userService = require("./user.service");
const reservationService = require("./reservation.service");
const activityService = require("./activity.service");
const locationService = require("./location.service");

const services = {
  userService,
  reservationService,
  activityService,
  locationService,
};

module.exports = services;
