var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
var Ticket = require('../models/Ticket');

router.get('/getticket', (req, res) => {
    Ticket.find(req.query).exec()
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


router.post('/newticket', (req, res) => {

    if (req.body.account_code) {
        Create(req.body, res)
    } else {
        res.status(500).json({ error: "account code is missing" });
    }
})

function Create(obj, res) {
    var str = "TCKT";
    var firstID = "TCKT0000001";
    const ticket = new Ticket(obj);
    Ticket.findOne().sort({ "ticket_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.ticket_id = doc.ticket_id.substring(str.length);
                doc.ticket_id = parseInt(doc.ticket_id) + 1;
                doc.ticket_id = doc.ticket_id.toString().padStart(7, "0");
                doc.ticket_id = str + doc.ticket_id;
            } else {
                doc = {};
                doc.ticket_id = firstID;
            }
            if (ticket.account_code) {
                ticket.ticket_id = doc.ticket_id;

                ticket.save()
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
            } else {
                res.status(500).json({ error: "error" });
            }

        })
}


module.exports = router;