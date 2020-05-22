'use strict';
const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var secret = 'fe1a1915a379f3be5394b64d14794932';
const db = require('./models');
const creatUser = require('./models/creatuser');
const loginUser = require('./models/loginuser');




app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


// CREAT USER NEW
app.post('/user/creat', async function(req, res) {
    try {
        // const salt = await bcrypt.genSalt()
        const hashpassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, mailId: req.body.mailId, password: hashpassword }
        const newUser = new creatUser(user);
        const result = await newUser.save();
        res.json(result);
    } catch (error) {
        res.status(400).send('bad request');
    }
})

// LOGIN USERE

app.post('/user/login', function(req, res) {
    try {
        const email = req.body.email
        const password = req.body.password
        creatUser.findOne({ email }).then(user => {
            if (!user) {
                return res.status(400).json({ msg: "User not exist" })
            }
        })
        bcrypt.compare(password, user.password, (err, data) => {
            if (data) {
                return res.status(200).json({ msg: "Login success" })
            } else {
                return res.status(401).json({ msg: "Invalid credencial" })
            }
        })
    } catch (error) {
        res.status(400).send('bad request');

    }

})





// GET LOGINUSERS
app.get('/user/all', async function(req, res) {
    try {
        const users = await loginUser.find({}).lean();
        res.json(users)
    } catch (error) {
        res.status(400).send('bad request');

    }
})

app.listen(port, console.log(`app is running @ port number ${port}`))