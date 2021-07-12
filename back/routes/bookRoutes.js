// const express = require("express");
// const { verifyToken } = require("../middleware");
// const BookData = require("../model/book");
// const router = express.Router();

// //********************************** bookroutes ***********************************************//
// router.get("/", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   const books = await BookData.find();
//   return res.send(books);
// });

// router.post("/", verifyToken, async function (req, res) {
//   console.log(req.body.book);
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   var book4saving = new BookData(req.body.book);
//   await book4saving.save();
// });

// router.get("/:id", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   const book = await BookData.findById(req.params.id);
//   return res.send(book);
// });

// router.put("/:id", verifyToken, async (req, res) => {
//   const { id } = req.params;
//   console.log(req.body.book);
//   const book = await BookData.findByIdAndUpdate(id, { ...req.body.book });
// });

// router.delete("/:id", verifyToken, async (req, res) => {
//   await BookData.findByIdAndDelete(req.params.id);
// });

// module.exports = router;
