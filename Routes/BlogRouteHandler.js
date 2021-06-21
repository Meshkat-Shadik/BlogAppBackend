const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Blog = require("../Model/BlogModel");

//Get all the blogs
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Success",
    });
});

//post a blog
router.post("/", async(req, res) => {
    const newBlog = new Blog(req.body);
    await newBlog.save((err) => {
        if (!err) {
            res.status(201).json({
                message: "Blog was inserted successfully!",
            });
        } else {
            res.status(500).json({
                error: "There was a server side error!",
            });
        }
    });
});

module.exports = router;