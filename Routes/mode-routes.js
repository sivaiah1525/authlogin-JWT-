const express = require("express");
const router = express.Router();
const modeController = require("../controller/mode-controller");

router.post("/registration", modeController.Registration);
router.post("/login", modeController.Login);
router.post("/newstudent", modeController.newstudent);
router.post("/student/deletbyid", modeController.updateByIDStudent);
router.post("/student/updatebyid", modeController.updateByIDStudent);
router.post("/maill/forgotpassword", modeController.forgotpasswordMaill);
router.post("/update/resetpassword", modeController.ResetPasswordUpdate);
router.get("/student/all", modeController.GetAllStudent);

module.exports = router;