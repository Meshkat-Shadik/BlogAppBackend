const express = require("express");
const router = express.Router();
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { checkToken } = require("../middlewares/token");
const {
    loginGetUser,
    loginUser,
    updateUser,
    deleteUser,
    registerUser,
} = require("../controllers/UserController");

//show user data
router.get("/:username", checkToken, loginGetUser);

//login
router.post("/login", loginUser);

//registration
router.post("/register", registerUser);

//update password/info
router.put("/update/:username", checkToken, updateUser);

//Delete the user by username
router.delete("/delete/:username", checkToken, deleteUser);

module.exports = router;