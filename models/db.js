const mongoose = require('mongoose');
const URL = 'mongodb+srv://student:student@cluster0-i4rfj.mongodb.net/test';


async function connectToDB() {
    try {
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


const db = mongoose.connection
module.exports = db;