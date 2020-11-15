const mongoose = require('mongoose');

const Account = mongoose.Schema({
    account_code: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    company_name: String,
    mobile_phone: String,
    street: String,
    city: String,
    province: String,
    postal_code: String,
    account_type: String,
    full_name: String,
    created_time: Date,
    service_activation_date: Date
}, {
    versionKey: false
})

module.exports = mongoose.model("accounts", Account);