var express = require("express");
const mongoose = require("mongoose");
var router = express.router();
var Device = require("../models/Device");

router.get("/getdevice", (req, res)=>{
	Device.find(req.query).exec()
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

router.post("/newdevice", (req, res)=>{
	if(req.body){
		Create(req.body, res);
	} else {
		res.status(500).json({status : "Device is not found"});
	}
})

router.post("/updatedevice/:id", (req, res)=>{
	var id = req.params.id;
	console.log("Updating ticket ", id);
	    Device.findOneAndUpdate({ "device_id": id }, req.body, { new: true }).exec()
	        .then((doc) => {
	            if (doc) {
	                var response = {
	                    status: "ok",
	                    data: doc
	                }
	
	                res.status(200).json(response);
	            } else {
	                res.status(500).json({ error: "Device is not updated" })
	            }
	        })
})

function Create(obj, res) {
    var str = "DEVI";
    var firstID = "DEVI0000001";
    const device = new Device(obj);
    User.findOne().sort({ "device_id": -1 })
        .then((doc) => {
            if (doc) {
                doc.device_id = doc.device_id.substring(str.length);
                doc.device_id = parseInt(doc.device_id) + 1;
                doc.device_id = doc.device_id.toString().padStart(7, "0");
                doc.device_id = str + doc.device_id;
            } else {
                doc = {};
                doc.device_id = firstID;
            }
            device.created_date = Date.now();
            device.device_id = doc.user_id;
            device.save()
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
