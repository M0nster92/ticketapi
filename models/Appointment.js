const mongoose = require("mongoose");

const Appointment = mongoose.Schema({
    appointment_id: String,
    ticket_id: String,
    type: String,
    address: {
        street: String,
        city: String,
        province: String,
        postal_code: String
    },
    subject: String,
    start_time: Date,
    end_time: Date,
    assigned_user: String,
    notes: String
}, {
    versionKey: false
})

module.exports = mongoose.model("appoitments", Appointment);