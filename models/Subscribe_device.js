const mongoose = require("mongoose");

const Subscribe = mongoose.Schema({
    subscribe_code: String,
    device_name: String,
    device_id: String,
    price: Number,
    status: String,
    created_date: Date,
    start_date: Date,
    account_code: String,
    first_name: String,
    last_name: String,
    device_type: String
})

module.exports = mongoose.model("subscribe_device", Subscribe);