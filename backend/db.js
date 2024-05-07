const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://techlife3399:mWljrun73t06YUv6@cluster0.bftbmte.mongodb.net/");

const userSchema = mongoose.Schema({
    username: String,
    password: String, //hashing will do
    firstName: String,
    lastName: String

})

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        requires: true
    },
    balance: Number

})
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
} 