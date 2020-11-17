var express = require("express");
const mongoose = require("mongoose");
const { session } = require("passport");
var router = express.Router();
var passport = require("passport");

var User = require("../models/User");
var sessionObj = {};

router.get("/users", (req, res) => {
    User.find(req.query).exec()
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

router.get("/getuser/:id", (req, res) => {
    var id = req.params.id;
    User.findOne({ "user_id": id }).exec()
        .then((doc) => {
            if (doc) {
                var response = {
                    status: "ok",
                    data: doc
                }
                res.status(200).json(response);
            } else {
                res.status(500).json({ error: "User id is not found" });
            }
        })
})

router.post("/newuser", (req, res) => {
    if (req.body.user_name) {
        Create(req.body, res);
    } else {
        res.status(500).json({ error: "User Id not found" });
    }
})

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { console.log("error"); return res.status(500).json({ status: "User id is not found" }) }
        if (!user) {
            return res.status(500).json({ status: "User id is not found", info: info })
        }
        req.logIn(user, function(err) {
            if (err) { console.log("error in 2nd function"); return res.status(500).json({ status: "User id is not found" }) }
            req.session.userId = user.user_id;
            req.session.user_name = user.user_name;
            
            sessionObj = {
                user : user,
                session : req.session
            }

            return res.status(200).json({
                status: "ok",
                data : sessionObj
            });
        });
    })(req, res, next);
});

router.get("/checksession/", (req, res)=>{
    res.send(sessionObj);
    
})

router.post("/extend", (req, res)=>{
    var hour = 3600000;
    req.session.cookie.expires = new Date(Date.now()+ hour);
    req.session.cookie.maxAge = hour;
    req.session.user = req.body;
    res.send(req.session);
})


function Create(obj, res) {
    var str = "USER";
    var firstID = "USER0000001";
    const user = new User(obj);
    User.findOne().sort({ "user_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.user_id = doc.user_id.substring(str.length);
                doc.user_id = parseInt(doc.user_id) + 1;
                doc.user_id = doc.user_id.toString().padStart(7, "0");
                doc.user_id = str + doc.user_id;
            } else {
                doc = {};
                doc.user_id = firstID;
            }
            user.password = User.hashPassword(obj.password);
            user.created_date = Date.now();
            user.user_id = doc.user_id;
            user.save()
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