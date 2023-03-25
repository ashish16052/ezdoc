const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const mainRouter = express.Router();
const docModel = mongoose.model("Doc");

module.exports.controllerFunction = function (app) {

    mainRouter.post('/save', (req, res) => {
        docModel.findByIdAndUpdate(req.body._id, req.body,
            { upsert: true, new: true },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else if (doc) {
                    res.send(doc)
                }
            });
    })

    mainRouter.get('/findall/:userid', (req, res) => {
        docModel.find({ userid: req.params.userid },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else if (doc) {
                    res.send(doc)
                }
            });
    })

    mainRouter.get('/findone/:id', (req, res) => {
        docModel.findOne({ _id: req.params.id },
            function (err, doc) {
                if (err) {
                    return res.send(err);
                } else if (doc) {
                    res.send(doc)
                }
            });
    })

    app.use("/doc", mainRouter);
};
