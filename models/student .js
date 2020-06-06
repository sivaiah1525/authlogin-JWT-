const mongoose = require('mongoose')
const Scheema = mongoose.Schema

var student = new Scheema({
    studentname: String,
    Fathername: String,
    mailId: String,
    RollNo: String,
    DOF: String,
    Rank: String,
    Departent: String,
})


const Student = mongoose.model('newstudent', student);
module.exports = Student;