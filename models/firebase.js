// firebase nitification  import
var admin = require("firebase-admin");
var serviceAccount = require("../crud-operation-939cc-firebase-adminsdk-ceacd-93e0b7f451.json");
var registrationToken = "BCvGqYBPsGu9KoKhHabJDja8xRPqs6Czo-H2ooatYS_gsU-Sk1qXu_iHCk01BqXn-2HK5BiJRBXaJBZnT8rE_eU";
var payload = {
    notification: {
        title: "Account Deposit",
        body: "A deposit to your savings account has just cleared."
    }
};



// firebase nitification fuction 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crud-operation-939cc.firebaseio.com"
});
admin.messaging().sendToDevice(registrationToken, payload)
    .then(function(response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
    });