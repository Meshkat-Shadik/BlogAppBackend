const express = require("express");
const mongoose = require("mongoose");
const blogHandler = require("./Routes/BlogRouteHandler");
const userHandler = require("./Routes/userHandler");
const { uri } = require("./config");
//express app initialization
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

//database connection with mongoose
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

//routes
app.use("/", (req, res) => {
    res.json({ message: "Welcome to blog app" });
});
app.use("/blog", blogHandler);
app.use("/user", userHandler);
app.use(errorHandler);

//default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.listen(port, () => {
    console.log("App listening at port " + port);
});