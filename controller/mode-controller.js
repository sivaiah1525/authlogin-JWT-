const creatUser = require('../models/creatuser');
const Student = require('../models/student ');
// registration user password hash 
const bcrypt = require('bcrypt');
var secret = 'fe1a1915a379f3be5394b64d14794932';
// creat JWT login user 
const jwt = require('jsonwebtoken');
// nodemailer forgotpassword 
var nodemailer = require('nodemailer');




// CREAT NEW Registration
const Registration = async(req, res) => {
    try {
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, mailId: req.body.mailId, password: hashpassword }
        const newUser = new creatUser(user);
        const result = await newUser.save();
        res.json(result);
    } catch (error) {
        res.status(400).send('bad request');
    }
};



// LOGIN USERE
const Login = async(req, res) => {
    try {
        const password = req.body.password
        creatUser.findOne({ mailId: req.body.mailId }).then(user => {
            console.log(user);
            if (!user) {
                return res.status(400).json({ msg: "User not exist" })
            } else {
                bcrypt.compare(password, user.password, (err, data) => {
                    if (data) {
                        jwt.sign({ user }, secret, (error, token) => {
                            res.json({ token: token })
                        });
                    } else {
                        return res.status(401).json({ msg: "Invalid credencial" })
                    }
                })
            }
        })

    } catch (error) {
        res.json(error);

    }

};



// creat newstudent
const newstudent = async(req, res) => {
    try {
        const student = req.body
        const newstudent = new Student(student);
        const result = await newstudent.save();
        res.json(result);
    } catch (error) {
        res.status(400).send('bad request');
    }
};


// get all STUDENTES
const GetAllStudent = async(req, res) => {
    try {
        var skip = Number(req.query.skip)
        var limi = Number(req.query.limit)
        var sort = Number(req.query.sort)
        var search = req.query.search
        console.log(skip, limi, sort, search)
        const result = await Student.find({ studentname: { $regex: search } }).skip(skip).limit(limi).sort({ studentname: sort })
        res.json(result)
    } catch (error) {
        res.status(400).send('bad request');
    }
};


//  DeletById student
const DeletByIdStudent = async(req, res) => {
    try {
        const result = await Student.findByIdAndDelete({ _id: req.body.id }).lean();
        res.json(result)
    } catch (error) {
        console.log(error)
    }
};



// updateByID student
const updateByIDStudent = async(req, res) => {
    try {
        const updateid = { _id: req.body.id };
        const updatevalues = {
            studentname: req.body.studentname,
            Fathername: req.body.Fathername,
            mailId: req.body.mailId,
            RollNo: req.body.RollNo,
            DOF: req.body.DOF,
            Rank: req.body.Rank,
            Departent: req.body.Departent
        };
        const result = await Student.updateOne(updateid, updatevalues).lean();
        res.json(result)
    } catch (error) {
        console.log(error)
    }
};

//  forgotpassword verification User send maill link
const forgotpasswordMaill = async(req, res) => {
    var mailId = req.body.mailId
    await creatUser.findOne({ mailId: mailId }).then((user) => {
        if (!user) {
            return res.status(400).json({ msg: "User not find" })
        } else {
            jwt.sign({ id: user._id }, secret, (error, token) => {
                if (!token) {
                    res.send(400).json({ msg: "error in token" })
                } else {
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'sivagopi821@gmail.com',
                            pass: 'mech@537'
                        }
                    });
                    var mailOptions = {
                        from: 'sivagopi821@gmail.com',
                        to: mailId,
                        subject: 'Reset your account password',
                        html: '<h4><b>Reset Password</b></h4>' +
                            '<p>To reset your password, complete this form:</p>' + '<a href="http://localhost:4200/resetpassword">Resetpassword Link Click Here</a>'
                    };
                    transporter.sendMail(mailOptions, function(error, info) {
                        if (info) {
                            res.json({ msg: " maill send" })
                        } else {
                            res.json({ msg: " mail not send " })
                        }
                        transporter.close();
                    });
                }
            })
        }

    })
};


// resetPassword update user 
const ResetPasswordUpdate = async(req, res) => {
    try {
        const updatemailId = { mailId: req.body.mailId }
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        await creatUser.findOne(updatemailId).then((user) => {
            if (!user) {
                res.json({ msg: "undefind user" })
            } else {
                user.password = hashpassword
                user.save().then((result) => {
                    res.json(result)
                }).catch((err) => {
                    res.json(error)
                })
            }
        })
    } catch (error) {
        res.json(error)

    }
};

module.exports = {
    Registration,
    Login,
    newstudent,
    GetAllStudent,
    DeletByIdStudent,
    updateByIDStudent,
    forgotpasswordMaill,
    ResetPasswordUpdate
};