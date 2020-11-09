const mongoose = require("mongoose");

const Technician = mongoose.Schema({
    user: String,
    display_name: String,
    fieldService: String,
    lab: String,
    phonesupport: String,
    category: [],
    extension: String
}, {
    versionKey: false
})

module.exports = mongoose.model("technicians", Technician);