const mongoose = require("Mongoose");

const Package = mongoose.Schema({
	package_id : String,
	category : String,
	price : Number,
	customer_count : Number,
	status : Boolean,
	created_date : Date
})

module.exports= mongoose.model("package", Package);