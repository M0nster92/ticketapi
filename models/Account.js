const mongoose = require('mongoose');

const Account = mongoose.Schema({
    account_code: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    company_name: String,
    mobile_phone: String,
    address: String,
    city: String,
    province: String,
    postal_code: String,
    account_type: String,
    full_name: String
}, {
    versionKey: false
})

module.exports = mongoose.model("accounts", Account);