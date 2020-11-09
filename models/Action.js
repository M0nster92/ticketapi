const mongoose = require("mongoose");

const Action = mongoose.Schema({
    action_id: String,
    ticket_id: String,
    username: String,
    action_type: String,
    start_time: Date,
    end_time: Date,
    duration: Number,
    completed: Boolean,
    notes: String
}, {
    versionKey: false
})

module.exports = mongoose.model("actions", Action);