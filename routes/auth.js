const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  forgotpassword,
  resetPassword,
  updateDetails,
  updatePassword,
  logout,
} = require("../controller/auth");
const { protect } = require("../middleware/auth");
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(protect, getMe);
router.route("/forgotpassword").post(forgotpassword);
router.route("/updatedetails").put(protect, updateDetails);
router.route("/updatePassword").put(protect, updatePassword);
router.route("/resetpassword/:resettoken").put(resetPassword);

module.exports = router;
