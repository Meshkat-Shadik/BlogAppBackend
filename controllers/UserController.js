const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const config = require("../config");

const loginGetUser = async(req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.status(200).json({
                data: user,
                username: req.params.username,
            });
        } else {
            res.status(500).json({
                error: "Username was not found!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

const loginUser = async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            if (user.password == req.body.password) {
                let token = jwt.sign({
                        username: req.body.username,
                    },
                    config.key, {
                        expiresIn: "24h",
                    }
                );

                res.json({ token: token, message: "login Success" });
            } else {
                res.status(500).json({
                    error: "password error ",
                });
            }
        } else {
            res.status(500).json({
                error: "Username was not found!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

const registerUser = async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save((err) => {
            if (!err) {
                res.status(201).json({
                    message: "User was registered successfully!",
                });
            } else {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

const updateUser = async(req, res) => {
    const query = { username: req.params.username };
    try {
        await User.findOneAndUpdate(
            query, {
                $set: {
                    password: req.body.password,
                },
            },
            (err, res2) => {
                if (!err) {
                    res.json({ message: "successfully updated!", data: res2 });
                } else {
                    res.status(500).json({
                        error: err,
                    });
                }
            }
        );
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

const deleteUser = async(req, res) => {
    const deletedUser = await User.deleteOne({ username: req.params.username });
    try {
        if (deletedUser) {
            res.status(200).json({
                message: "User was deleted successfully!",
            });
        } else {
            res.status(500).json({
                error: "There was a server side error!",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }
};

module.exports = {
    loginGetUser,
    loginUser,
    registerUser,
    updateUser,
    deleteUser,
};