const express = require("express");
const router = express.Router();
const ticket = require("./ticket");
const account = require("./account");
const action = require("./action");

router.use("/", ticket);
router.use("/", account);
router.use("/", action);

module.exports = router;