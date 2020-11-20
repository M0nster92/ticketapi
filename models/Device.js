const mongoose = require("mongoose");

const Device = mongoose.Schema({
	device_id : String,
	serial : String,
	model : String,
	mac : String,
	created_date : String,
	name : String
})

module.exports = mongoose.model("devices", Device);
