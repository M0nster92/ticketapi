const mongoose = require("mongoose");

const Device = mongoose.Schema({
    device_id: String,
    serial: String,
    model: String,
    mac: String,
    created_date: Date,
    name: String,
    type: String,
    active: Boolean,
    account_code: String
}, {
    versionKey: false
})

module.exports = mongoose.model("devices", Device);