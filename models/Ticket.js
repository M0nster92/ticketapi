const mongoose = require('mongoose');

const Ticket = mongoose.Schema({
    ticket_id: String,
    account_code: String,
    first_name: String,
    last_name: String,
    account_request: String,
    subscribe_code: String,
    priority: Number,
    status: String,
    category: String,
    issue: String,
    subject: String,
    resolution: String,
    assigned_user: String,
    assigned_date: Date,
    created_user: String,
    created_date: Date,
    last_update_user: String,
    last_update_date: Date,
    closed_user: String,
    closed_date: Date,
    hold_date: Date,
    notes: String,
    priority: String
}, {
    versionKey: false
})

module.exports = mongoose.model('tickets', Ticket);