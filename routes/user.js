const express = require("express");
const { handleSignUp, handleLogIn } = require("../controller/user");

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
