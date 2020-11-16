const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const { schema } = require("./Account");

const User = mongoose.Schema({
    user_id: String,
    user_name: String,
    full_name: String,
    password: String,
    email: String,
    field: [],
    superuser: Boolean,
    admin: Boolean,
    created_date: Date
}, {
    versionKey: false
});

User.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

User.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}


module.exports = mongoose.model("user", User);