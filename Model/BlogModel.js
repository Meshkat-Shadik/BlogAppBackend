const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"] },
    date: { type: Date, default: Date.now() },
});

//instance methods
blogSchema.methods = {
    findActive: function() {
        return mongoose.model("Blog").find({
            status: "active",
        });
    },
};

blogSchema.statics = {
    findByEat: function() {
        return this.find({ title: "Eat" });
    },
};

blogSchema.query = {
    findByTitle: function(title) {
        return this.find({ title: new RegExp(title, "i") });
    },
};

module.exports = mongoose.model("Blog", blogSchema);