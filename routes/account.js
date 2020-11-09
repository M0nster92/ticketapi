var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();

var Account = require("../models/Account");


router.post('/newaccount', (req, res) => {
    if (req.body.first_name) {
        Create(req.body, res);
    } else {
        console.error("Account's first name is missing");
        res.status(500).json({ error: "first name is missing" });
    }
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