const mongoose = require("mongoose");

const Package = mongoose.Schema({
    package_id: String,
    category: String,
    price: Number,
    customer_count: Number,
    created_date: Date,
    name: String,
    customer_count : Number
}, {
	versionKey: false
})

module.exports = mongoose.model("package", Package);
