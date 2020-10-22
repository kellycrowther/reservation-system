const activity = require("./activity");
const reservation = require("./reservation");
const location = require("./location");

const models = {
  ...activity,
  ...reservation,
  ...location
};

module.exports = models;
