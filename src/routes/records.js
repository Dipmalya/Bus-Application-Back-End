const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uniqid = require("uniqid");

const Record = require("../models/record.model");
const jwtMWare = require("../webtoken/middleware");

router.get("/", (req, res, next) => {
    Record.find({})
        .exec()
        .then(records => res.status(200).json(records));
});

router.get("/:recordId", jwtMWare.checkToken, (req, res, next) => {
    const recordId = req.params.recordId;
    Record.findOne({ recordId })
        .exec()
        .then(record => res.status(200).json(record));
});

router.post("/entry", jwtMWare.checkToken, (req, res, next) => {
    const {
        templeName = '',
        city = '',
        state = '',
        country = '',
        numberOfBooks = '',
        date = "",
        population = "",
        comments = ""
    } = req.body;

    const newRecord = new Record({
        _id: new mongoose.Types.ObjectId(),
        recordId: uniqid.time(),
        templeName,
        location: {
            city,
            state,
            country
        },
        numberOfBooks,
        date,
        population,
        comments
    });

    newRecord
        .save()
        .then(() => {
            res.status(200).json({
                message: "Record entered successfully",
                success: true
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "Failed to enter record",
                success: false
            });
        });
});

module.exports = router;
