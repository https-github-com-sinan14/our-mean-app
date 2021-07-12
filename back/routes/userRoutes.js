const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserData = require("../model/user");
const { verifyToken } = require("../middleware");

router.post('/login', function (req, res) {
    console.log(req.body);
    const { Email,Password } = req.body
    if (Email == 'Admin@gmail.com' && Password == 'Admin@11') {
        req.session.role = 'admin';
        console.log("admin login success")
        const payload = { subject: Email + Password, admin:true }
        const token = jwt.sign(payload, 'secretKey')
        res.send({ status: true, token, role: req.session.role });

    } else {
        UserData.findOne({ Email: Email, Password: Password }, function (err, user) {
            if (err) {
                res.send({ status: false, data: 'you havenot registered' });
            }
            else if (user) {
                console.log("an user loginned")
                req.session.role = 'user';
                const payload = { subject: Email + Password,admin:false}
                const token = jwt.sign(payload, 'secretKey')
                res.send({ status: true, token, role: req.session.role })
            } else {
                res.send({ status: false, data: 'NOT FOUND' });
            }
        });
    }
});

//************************ register route **********************************************/
router.post('/register', function (req, res) {
    console.log(req.body.user)
    const user = new UserData(req.body.user)
    user.save().then(function (data) {
        res.send(true);
    }).catch(function (error) {
        res.send(false);
    })
});

module.exports = router;

