const mongoose = require('mongoose')
const Scheema = mongoose.Schema

var creatUser = new Scheema({
    name: String,
    mailId: String,
    password: String,
})


const User = mongoose.model('newUser', creatUser);
module.exports = User;