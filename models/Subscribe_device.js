const mongoose = require("mongoose");

const Subscribe = mongoose.Schema({
    subscribe_code: String,
    device_name: String,
    device_id: String,
    price: Number,
    status: String,
    created_date: Date,
    start_date: Date
})

module.exports = mongoose.model("subscribe_device", Subscribe);