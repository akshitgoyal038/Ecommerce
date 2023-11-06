const express = require("express");
const router = express.Router();

const {registerUser,
login,
logout,
changePassword} = require("../controllers/userController");

const {resetPasswordToken,resetPassword} = require("../controllers/resetPassword");

const {auth} = require("../middleware/auth");

router.post("/signup",registerUser);
router.post("/login",login);
router.get("/logout",logout);
router.post("/changepassword",auth,changePassword);
router.post("/reset-password-token",resetPasswordToken)

router.post("/reset-password",resetPassword)


module.exports = router;