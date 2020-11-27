const express = require("express");
const router = express.Router();
const ticket = require("./ticket");
const account = require("./account");
const action = require("./action");
const technician = require("./technician");
const user = require("./user");
const package = require("./package");
const device = require("./device");
const subscribePackage = require("./subscribe_package");
const subscribeDevice = require("./subscribe_device");

router.use("/", ticket);
router.use("/", account);
router.use("/", action);
router.use("/", technician);
router.use("/", user);
router.use("/", device);
router.use("/", package);
router.use("/", subscribePackage);
router.use("/", subscribeDevice);

module.exports = router;