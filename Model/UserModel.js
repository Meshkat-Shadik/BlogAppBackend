const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});

//instance methods
userSchema.methods = {
    findActive: function() {
        return mongoose.model("User").find({
            status: "active",
        });
    },
};

userSchema.statics = {
    findByEat: function() {
        return this.find({ title: "Eat" });
    },
};

userSchema.query = {
    findByTitle: function(title) {
        return this.find({ title: new RegExp(title, "i") });
    },
};

module.exports = mongoose.model("User", userSchema);



/*
username:"meshkat"
password:"123456"
email:"shadik@faysal.meshkat"
*/