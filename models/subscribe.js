const mongoose = require("mongoose");

const Subscribe = mongoose.Schema({
    subscribe_code: String,
    package_name: String,
    package_code: String,
    account_code: String,
    price: Number,
    status: String,
    created_date: String,
    start_date: String
}, {
    versionKey: false
})

module.exports = mongoose.model("subscribe", Subscribe);