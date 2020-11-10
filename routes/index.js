const express = require("express");
const router = express.Router();
const ticket = require("./ticket");
const account = require("./account");
const action = require("./action");
const technician = require("./technician");

router.use("/", ticket);
router.use("/", account);
router.use("/", action);
router.use("/", technician);

module.exports = router;