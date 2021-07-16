const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  SkilSet: {
    type: String,
  },
  HighestQualification: {
    type: String,
    required: true,
  },

  PassOfYear: {
    type: Number,
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
  District: {
    type: String,
    required: true,
  },
  Post: {
    type: String,
    required: true,
  },

  PinCode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
