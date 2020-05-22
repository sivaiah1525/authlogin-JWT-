const mongoose = require('mongoose')
const Scheema = mongoose.Schema

var loginUser = new Scheema({
    mailId: String,
    password: String,
})


const User = mongoose.model('loginUser', loginUser);
module.exports = User;