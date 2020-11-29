const mongoose = require("mongoose");

const Subscribe = mongoose.Schema({
    subscribe_code: String,
    package_name: String,
    package_code: String,
    account_code: String,
    price: Number,
    active: Boolean,
    created_date: Date,
    start_date: Date
}, {
    versionKey: false
})

module.exports = mongoose.model("subscribe_package", Subscribe);
