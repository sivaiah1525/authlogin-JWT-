const creatUser = require('./models/creatuser');
const Student = require('./models/student ');





// Reset password verification User send maill link
app.post('/resetpassword', async(req, res) => {
    var mailId = req.body.mailId
    await creatUser.findOne({ mailId: mailId }).then((user) => {
        console.log(user)
        if (!user) {
            return res.status(400).json({ msg: "User not find" })
        } else {
            jwt.sign({ resetPassword: user.password }, secret, (error, token) => {
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
                            '<p>To reset your password, complete this form:</p>' + '<a href="http://localhost:4200/resetpassword">Resetpassword</a>'
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
})