// const express = require("express");
// const router = express.Router();
// const AuthorData = require('../model/author');
// const { verifyToken } = require("../middleware");

// // ********************************* Author Routes ****************************************//

// router.get("/", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   const authors = await AuthorData.find({});
//   return res.send(authors);

// });

// router.post("/", verifyToken, async function (req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   console.log(req.body.author);

//   var author4saving = new AuthorData(req.body.author);
//   await author4saving.save();
// });
// router.get("/:id", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE,OPTIONS"
//   );
//   const author = await AuthorData.findById(req.params.id);
//   return res.send(author);

// });
// router.put("/:id", verifyToken, async (req, res) => {
//   const { id } = req.params;
//   console.log(req.body.author);

//   const author = await AuthorData.findByIdAndUpdate(id, { ...req.body.author });
// });

// router.delete("/:id", verifyToken, async (req, res) => {
//   await AuthorData.findByIdAndDelete(req.params.id);

// });



// module.exports = router;
