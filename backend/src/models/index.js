const activity = require("./activity");
const reservation = require("./reservation");
const location = require("./location");
const user = require("./user.model");

const models = {
  ...activity,
  ...reservation,
  ...location,
  ...user,
};

module.exports = models;
