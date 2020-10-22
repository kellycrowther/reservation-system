const express = require("express");
const router = new express.Router();

const activity = require("./activity");
const my = require("./my");

router.use('/activities', activity);
router.use('/my', my);

module.exports = router;
