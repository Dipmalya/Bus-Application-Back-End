const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  recordId: String,
    templeName: String,
    location: {
      city: String,
      state: String,
      country: String
    },
    numberOfBooks: String,
    date: String,
    population: String,
    comments: String
});

module.exports = mongoose.model("records", recordSchema, "recordsDB");
