const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Phone: {
    type: String,
    required: true,
    unique: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  HighestQualification: {
    type: String,
    required: true,
  },
  PassOfYear: {
    type: Date,
    min: "2010-01-01",

    required: true,
  },
  EmploymentStatus: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Distict: {
    type: String,
    required: true,
  },
  Post: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
