const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
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

  HighestQualification: {
    type: String,
    required: true,
  },
  SkilSet:{
    type:String,
    
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

  PinCode: {
    type: Number,
    required:true

  },
  Password:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
