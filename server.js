'use strict';
const express = require('express');
const app = express();
const cors = require('cors')
const port = 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modeRouter = require("./Routes/mode-routes");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(modeRouter);
async function connectToDB() {
    try {
        const URL = 'mongodb://localhost:27017/Studentproject';
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