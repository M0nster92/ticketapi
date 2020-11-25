const express = require("express");
const router = express.Router();
const ticket = require("./ticket");
const account = require("./account");
const action = require("./action");
const technician = require("./technician");
const user = require("./user");
const package = require("./package");
const device = require("./device");
const subscribe = require("./subscribe");

router.use("/", ticket);
router.use("/", account);
router.use("/", action);
router.use("/", technician);
router.use("/", user);
router.use("/", device);
router.use("/", package);
router.use("/", subscribe);

module.exports = router;