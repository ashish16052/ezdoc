const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportSetup = require('./lib/passport');
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const app = express();

var corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 1000000,
    })
);

app.use(session(
    {
        secret: 'pqrxyz',
        resave: false,
        saveUninitialized: true,
    }
));
app.use(passport.initialize());
app.use(passport.session());

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB);
    } catch (error) {
        console.log(error);
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port: " + process.env.PORT);
    });
})

mongoose.connection.on("connected", () => {
    console.log("Connected to database");
}).on("error", (err) => {
    console.log("Error in database connection" + err);
});

fs.readdirSync("./model").forEach(function (file) {
    require("./model/" + file);
});

fs.readdirSync("./controller").forEach(function (file) {
    if (file.indexOf(".js") !== -1) {
        var route = require("./controller/" + file);
        route.controllerFunction(app);
    }
});

