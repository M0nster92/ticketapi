var express = require("express");
var router = express.Router();
const Technician = require("../models/Technician");

router.get('/gettechnicians', (req, res) => {
    Technician.find(req.query).exec()
        .then((doc) => {
            if (doc.length == 0) {
                res.status(200).json({ status: "error" })
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
            res.status(200).json({ status: err });
        })
})

router.get("/gettechnician/:id", (req, res) => {
    var id = req.params.id;
    Technician.findOne({ "tech_id": id }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(200).json({ status: "Account is not updated" });
            }
        })
})

router.post("/updatetechnician/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating technician ", id);
    Technician.findOneAndUpdate({ "tech_id": id }, req.body, { new: true }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(200).json({ status: "Action is not updated" });
            }
        })
})

router.post('/newtechnician', (req, res) => {
    if (req.body) {
        Create(req.body, res);
    } else {
        res.status(200).json({ status: "Tech body is missing" });
    }
})

router.get("/searchtechnician/:str", async function(req, res) {
    var searchStr = req.params.str;
    console.log("Searching device for string: " + searchStr);
    Technician.find({
            $or: [
                { "display_name": { "$regex": searchStr, "$options": "i" } },
                { "extension": { "$regex": searchStr, "$options": "i" } },
                { "user": { "$regex": searchStr, "$options": "i" } }
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

function Create(obj, res) {
    var str = "TECH";
    var firstID = "TECH0000001";
    const tech = new Technician(obj)
    Technician.findOne().sort({ "tech_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.tech_id = doc.tech_id.substring(str.length);
                doc.tech_id = parseInt(doc.tech_id) + 1;
                doc.tech_id = doc.tech_id.toString().padStart(7, "0");
                doc.tech_id = str + doc.tech_id;
            } else {
                doc = {};
                doc.tech_id = firstID;
            }
            tech.tech_id = doc.tech_id;
            tech.save()
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