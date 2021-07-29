const express = require("express");
const wrapAsync = require('../util/wrapAsync')
const router = express.Router();
const jwt = require("jsonwebtoken");
const StudentData = require("../model/student");
const bcrypt = require("bcrypt");
//************************        register route ***************************************/
router.post("/register", wrapAsync(async function (req, res) {
  console.log(req.body.user);
  const user = new StudentData(req.body.user);
  user
    .save()
    .then(function (data) {
      res.send(true);
    })
    .catch(function (error) {
      res.send(false);
    });
}));

// router.post("/login", function (req, res) {
//   console.log(req.body);
//   const { Email, Password } = req.body;
//   if (Email == "admin@gmail.com" && Password == "Admin@11") {
//     req.session.role = "admin";
//     console.log("admin login success");
//     const payload = { subject: Email, admin: true };
//     const token = jwt.sign(payload, "secretKey", { expiresIn: "3h" });
//     res.send({ status: true, token, role: req.session.role });
//   } else {
//     StudentData.findOne(
//       { Email: Email, Password: Password },
//       function (err, user) {
//         if (err) {
//           res.send({ status: false, data: "you havenot registered" });
//         } else if (user) {
//           console.log("an user loginned");
//           req.session.role = "user";
//           const payload = { subject: Email, admin: false };
//           const token = jwt.sign(payload, "secretKey", { expiresIn: "3h" });
//           res.send({ status: true, token, role: req.session.role });
//         } else {
//           res.send({ status: false, data: "NOT FOUND" });
//         }
//       }
//     );
//   }
// });

router.post("/login",wrapAsync( async function (req, res) {
  console.log(req.body);
  const { Email, Password } = req.body;
  if (Email == "admin@gmail.com" && Password == "Admin@11") {
    req.session.role = "admin";
    console.log("admin login success");
    const payload = { subject: Email, admin: true };
    const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
    res.send({ status: 200, token, role: req.session.role });
  } else {
    const foundUser = await StudentData.findAndValidate(Email, Password);
    const id = foundUser._id
    console.log(id)

    if (foundUser) {
      console.log("an user loginned");
      req.session.role = "user";
      const payload = { subject: Email, admin: false };
      const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
      res.send({ status: true, token,id, role: req.session.role });
    } else {
      res.send({ status: false, data: "NOT FOUND" });
    }
  }
}));

module.exports = router;
