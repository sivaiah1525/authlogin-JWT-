'use strict';
const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modeRouter = require("./Routes/mode-routes");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


async function connectToDB() {
    try {
        const URL = 'mongodb+srv://student:student@cluster0-i4rfj.mongodb.net/test';
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Succefully Connected To DB');
    } catch (error) {
        console.error('Database Connection Failed');
    }
}
connectToDB()
app.listen(port, console.log(`app is running @ port number ${port}`))