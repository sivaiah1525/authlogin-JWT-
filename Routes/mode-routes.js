const express = require("express");
const router = express.Router();
const modeController = require("../controller/mode-controller");

router.post("/registration", modeController.Registration);
router.post("/login", modeController.Login);
router.post("/newstudent", modeController.newstudent);
router.get("/student/all", modeController.GetAllStudent);
router.get("/student/deletbyid", modeController.updateByIDStudent);
router.get("/student/updatebyid", modeController.updateByIDStudent);
router.get("/maill/forgotpassword", modeController.forgotpasswordMaill);
router.get("/update/resetpassword", modeController.ResetPasswordUpdate);

module.exports = router;