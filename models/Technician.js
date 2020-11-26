const mongoose = require("mongoose");

const Technician = mongoose.Schema({
    tech_id: String,
    user: String,
    display_name: String,
    fieldService: Boolean,
    lab: Boolean,
    phonesupport: Boolean,
    category: [],
    extension: String,
    created_date: Date
}, {
    versionKey: false
})

module.exports = mongoose.model("technicians", Technician);