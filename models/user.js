var mongoose = require("mongoose");
var passportLocalStrategy = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    mail: String,
    password: String,
    isAdmin: Boolean,
    created: { type: Date, default: Date.now },
    fullName: String,
    description: String,
    image: String,
    active: { type: Boolean, default: true }
});

userSchema.plugin(passportLocalStrategy, { usernameField: 'mail' });

module.exports = mongoose.model("User", userSchema);
