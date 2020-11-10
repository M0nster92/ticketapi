var express = require("express");
var router = express.Router();
const Technician = require("../models/Technician");

router.get('/gettechnician', (req, res) => {
    Technician.find(req.query).exec()
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
                res.status(500).json({ error: "Action is not updated" });
            }
        })
})

router.post('/newtechnician', (req, res) => {
    if (req.body) {
        Create(req.body, res);
    } else {
        res.status(500).json({ error: "Tech body is missing" });
    }
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