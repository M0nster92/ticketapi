var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

var Account = require("../models/Account");


router.get("/getaccount", (req, res) => {
    Account.find(req.query).exec()
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

router.post('/newaccount', (req, res) => {
    if (req.body.first_name) {
        Create(req.body, res);
    } else {
        console.error("Account's first name is missing");
        res.status(500).json({ error: "first name is missing" });
    }
})

router.post("/updateaccount/:id", (req, res) => {
    var id = req.params.id;
    console.log("Updating id for account code ", id);
    Account.findOneAndUpdate({ "account_code": id }, req.body, { new: true }).exec()
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

function Create(obj, res) {
    var str = "ACCT";
    var firstID = "ACCT0000001";
    const account = new Account(obj);
    Account.findOne().sort({ "account_code": -1 })
        .then((doc) => {
            if (doc) {
                doc.account_code = doc.account_code.substring(str.length);
                doc.account_code = parseInt(doc.account_code) + 1;
                doc.account_code = doc.account_code.toString().padStart(7, "0");
                doc.account_code = str + doc.account_code;
            } else {
                doc = {};
                doc.account_code = firstID;
            }

            account.account_code = doc.account_code;
            account.save()
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

module.exports = router