const express = require("express");
const router = new express.Router();

const reservation = require("./reservation");

router.use('/reservations', reservation);

module.exports = router;