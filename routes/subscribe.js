var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

const Subscribe = require("../models/subscribe");

router.get("/getsubscribes", (req, res) => {
    Subscribe.find(req.query).exec()
        .then((doc) => {
            if (doc.length == 0) {
                res.status(200).json({ status: "ok", data: [] })
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
            res.status(500).json({ error: err, data: [] });
        })
})

router.get("/getsubscribe/:id", (req, res) => {
    var id = req.params.id;
    Subscribe.findOne({ "subscribe_code": id }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(500).json({ error: "Subscribe is not updated" });
            }
        })
})

router.post('/newsubscribe', (req, res) => {
    if (req.body) {
        Create(req.body, res);
    } else {
        console.error("subscribe body is missing");
        res.status(500).json({ error: "subscribe body is missing" });
    }
})

router.post("/updatesubscribe/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating id for subscribe", id);
    Subscribe.findOneAndUpdate({ "subscribe_code": id }, req.body, { new: true }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(500).json({ error: "Subscribe is not updated" });
            }

        })
})


function Create(obj, res) {
    var str = "SUBS";
    var firstID = "SUBS0000001";
    const subscribe = new Subscribe(obj);
    Subscribe.findOne().sort({ "subscribe_code": -1 })
        .then((doc) => {
            if (doc) {
                doc.subscribe_code = doc.subscribe_code.substring(str.length);
                doc.subscribe_code = parseInt(doc.subscribe_code) + 1;
                doc.subscribe_code = doc.account_code.toString().padStart(7, "0");
                doc.subscribe_code = str + doc.subscribe_code;
            } else {
                doc = {};
                doc.subscribe_code = firstID;
            }
            Subscribe.created_time = Date.now();
            Subscribe.subscribe_code = doc.subscribe_code;
            Subscribe.save()
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