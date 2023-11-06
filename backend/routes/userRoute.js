const express = require("express");
const router = express.Router();

const {registerUser,
login,
logout,
changePassword,
getUSerDetails,
updateProfile,
getAllUserDetails,
getAllUser,
deleteUser} = require("../controllers/userController");

const {resetPasswordToken,resetPassword} = require("../controllers/resetPassword");

const {auth,isAdmin} = require("../middleware/auth");

router.post("/signup",registerUser);
router.post("/login",login);
router.get("/logout",logout);
router.post("/changepassword",auth,changePassword);
router.post("/reset-password-token",resetPasswordToken)

router.post("/reset-password",resetPassword)
router.get("/me",auth,getUSerDetails);
router.put("/me-update",auth,updateProfile);
router.get("/admin/user",auth,isAdmin,getAllUser)
router.put("/admin/user/:id",auth,isAdmin,getAllUserDetails);
router.delete("/admin/user/:id",auth,isAdmin,deleteUser);

module.exports = router;