const express = require("express");
const router = new express.Router();

const activity = require("./activity");
const my = require("./my");
const user = require("./user");

router.use("/activities", activity);
router.use("/my", my);
router.use("/users", user);

module.exports = router;
