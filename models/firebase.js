// firebase nitification  import
var admin = require("firebase-admin");

// firebase nitification fuction 

const message = async(res, req, next) => {
    console.log(req)
    try {
        var serviceAccount = require("../crud-operation-939cc-firebase-adminsdk-ceacd-93e0b7f451.json");
        var registrationToken = res.header;
        console.log(registrationToken);
        var payload = {
            notification: {
                title: "Account Deposit",
                body: "A deposit to your savings account has just cleared."
            }
        };
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://crud-operation-939cc.firebaseio.com"
        });
        const result = await admin.messaging().sendToDevice(registrationToken, payload)
        console.log("Successfully sent message:", result);
        next();
    } catch (error) {
        res.status(404).josn("Successfully sent message:", errror)
        next();
    }
}



module.exports = {
    message
}