if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const wrapAsync = require("./util/wrapAsync");
const ExpressError = require("./util/ExpressError");
const port = process.env.PORT || 3000;
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const loginRoutes = require("./routes/loginRoutes");
const studentRoutes = require("./routes/studentRoutes");

//*************************** connecting our database ****************************
const dbUrl = "mongodb://localhost:27017/project-mean";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const sessionConfig = {
  secret: "thisisverysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: false,
    cookie: { secure: false },
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60,
  },
};
app.use(session(sessionConfig));
app.use("/", loginRoutes);
app.use("/students", studentRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  // res.status(statusCode).render('error', { err })
  console.log({status:statusCode})
  console.log({errorMessage:err.message})
  res.send({ status: statusCode, error: err });
});

app.listen(port, () => {
  console.log("Serving on port number" + port);
});
