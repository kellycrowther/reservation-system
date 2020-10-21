const express = require("express");
const router = new express.Router();

const activity = require("./activity");

router.use('/activities', activity);

module.exports = router;
