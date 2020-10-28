const userService = require("./user.service");
const reservationService = require("./reservation.service");
const activityService = require("./activity.service");

const services = {
  userService,
  reservationService,
  activityService,
};

module.exports = services;
