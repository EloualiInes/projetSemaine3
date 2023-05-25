const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    email: String,
    password: String,
    creationDate: Date
}, { collection: "user", versionKey: false })

module.exports = mongoose.model('User', userSchema);