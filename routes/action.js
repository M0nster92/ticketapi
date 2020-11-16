var express = require("express");
var router = express.Router();
var Action = require("../models/Action");

router.get("/getactions", (req, res) => {
    Action.find(req.query).exec()
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

router.post("/newaction", (req, res) => {
    if (req.body.ticket_id) {
        Create(req.body, res);
    } else {
        res.status(500).json({ error: "Ticket id not found" });
    }
})

router.post("/updateaction/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating action code ", id);
    Action.findOneAndUpdate({ "action_id": id }, req.body, { new: true }).exec()
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
    var str = "ACTN";
    var firstID = "ACTN0000001";
    const action = new Action(obj);
    Action.findOne().sort({ "action_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.action_id = doc.action_id.substring(str.length);
                doc.action_id = parseInt(doc.action_id) + 1;
                doc.action_id = doc.action_id.toString().padStart(7, "0");
                doc.action_id = str + doc.action_id;
            } else {
                doc = {};
                doc.action_id = firstID;
            }

            action.action_id = doc.action_id;
            action.save()
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