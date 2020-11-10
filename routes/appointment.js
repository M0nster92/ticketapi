var express = require("express");
var router = express.Router();
var Appointment = require("../models/Appointment");

router.get("/getappointment", (req, res) => {
    Appointment.find(req.query).exec()
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

router.post("/newappointment", (req, res) => {
    if (req.body) {
        Create(req.body, res);
    } else {
        res.status(500).json({ error: "Appointment id not found" });
    }
})

router.post("/updateappointment/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating appointment ", id);
    Appointment.findOneAndUpdate({ "appointment_id": id }, req.body, { new: true }).exec()
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

function Create(obj, res) {
    var str = "APPT";
    var firstID = "APPT0000001";
    const appointment = new Appointment(obj);
    Action.findOne().sort({ "appointment_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.appointment_id = doc.appointment_id.substring(str.length);
                doc.appointment_id = parseInt(doc.appointment_id) + 1;
                doc.appointment_id = doc.appointment_id.toString().padStart(7, "0");
                doc.appointment_id = str + doc.appointment_id;
            } else {
                doc = {};
                doc.appointment_id = firstID;
            }

            appointment.appointment_id = doc.action_id;
            appointment_id.save()
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