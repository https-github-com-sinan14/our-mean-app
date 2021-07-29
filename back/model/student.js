const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

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
  DOB: {
    type:Date,
    required:true
  },
  Course: {
    type: String,
    required: true,
  },
  SkillSet: {
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
  Status: {
    type:String,
    required:true
  },
  Password: {
    type:String
  }
});
StudentSchema.statics.hashPassword = function hashPassword(Password){
  return bcrypt.hashSync(Password,10);
}

// StudentSchema.methods.isValid = function(hashedpassword){
//   return bcrypt.compareSync(hashedpassword, this.Password);
// }

StudentSchema.statics.findAndValidate = async function (Email, Password) {
  const foundUser = await this.findOne({ Email });
  const isValid = await bcrypt.compare(Password, foundUser.Password);
  return isValid ? foundUser : false;
}

// StudentSchema.pre('save', async function (next) {
//   if (!this.isModified('Password')) return next();
//   this.Password = await bcrypt.hash(this.Password, 10);
//   next();
// })


module.exports = mongoose.model("Student", StudentSchema);
