const mongoose = require("Mongoose");

const Package = mongoose.Schema({
    package_id: String,
    category: String,
    price: Number,
    customer_count: Number,
    created_date: Date,
    name: String
})

module.exports = mongoose.model("package", Package);