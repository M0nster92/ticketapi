const express = require("express");
const router = express.Router();
const ticket = require("./ticket");
const account = require("./account");

router.use("/", ticket);
router.use("/", account);

module.exports = router;