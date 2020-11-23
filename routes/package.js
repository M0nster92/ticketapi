const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Package = require("../models/Package");

router.get("/getpackages", (req, res) => {
    Package.find(req.query).exec()
        .then((doc) => {
            if (doc.length == 0) {
                res.status(500).json({ status: "error" })
            } else {
                var response = {
                    status: "ok",
                    data: doc
                }

                res.status(200).json(response)
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

router.get("/getpackage/:id", (req, res) => {
    var id = req.params.id;
    Package.findOne({ "package_code": id }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(500).json({ error: "Account is not updated" });
            }
        })
})

router.post("/newdevice", (req, res) => {
    if (req.body) {
        Create(req.body, res);
    } else {
        res.status(500).json({ status: "package body is empty" });
    }
})

router.get("/searchpackage/:str", async(req, res) => {
    var searchStr = req.params.str;
    console.log("Searching device for string: " + searchStr);
    Package.find({
            $or: [
                { "name": { "$regex": searchStr, "$options": "i" } },
                { "package_id": { "$regex": searchStr, "$options": "i" } }
            ]
        }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(200).json({ status: "Device is not updated" });
            }
        })

})

router.post("/updatepackage/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating package ", id);
    Package.findOneAndUpdate({ "package_id": id }, req.body, { new: true }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }

                res.status(200).json(response);
            } else {
                res.status(500).json({ error: "Package is not updated" })
            }
        })
})

function Create(obj, res) {
    var str = "PACK";
    var firstID = "PACK0000001";
    const package = new Package(obj);
    Package.findOne().sort({ "package_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.package_id = doc.package_id.substring(str.length);
                doc.package_id = parseInt(doc.package_id) + 1;
                doc.package_id = doc.package_id.toString().padStart(7, "0");
                doc.package_id = str + doc.package_id;
            } else {
                doc = {};
                doc.package_id = firstID;
            }
            Package.created_date = Date.now();
            Package.package_id = doc.package_id;
            Package.device.save()
                .then((doc) => {
                    if (doc) {
                        let response = {
                            status: "ok",
                            data: doc
                        }
                        res.status(200).json(response);
                    } else {
                        res.status(500).json({ error: "error" });
                    }
                })
        })
}


module.exports = router;