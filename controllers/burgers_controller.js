var express = require("express");
var router = express.Router();
var burgers = require("../models/burger.js");

// CREATE THE ROUTER

// GET ROUTE TO DISPLAY ALL THE BURGERS IN THE DB
router.get("/", function(req, res) {
  burgers.selectAll(function(burger_data) {
    console.log("Before Burger Var");
    var burgersObj = {
      burgers: burger_data
    };
    console.log(burgersObj);
    res.render("index", burgersObj);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  console.log(req.body);

  burgers.updateOne({ devoured: true }, condition, function(result) {
    console.log("result", result);
    if (result.changedRows === 0) {
      //If NO ROWS WERE CHANGED, THEN THE ID MUST NOT EXSIST, SO 404 error
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// POST ROUTE TO UPDATE A BURGER WHEN ITS EATEN OR REMADE
router.post("/api/burgers", function(req, res) {
  console.log("Testing: ", req.body);

  burgers.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, false],
    function(result) {
      console.log("Result of eaten burger: ", result);
      // res.json({ id: result.insertId});
      res.redirect("/");
    }
  );
});

// router.put("/api/burgers/update", function(req, res) {
//   burgers.update(req.body.burger_id, function(result) {
//     console.log(result);
//     res.redirect("/");
//   });
// });

// router.delete("/api/burgers/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     burgers.delete(condition, function(result) {
//         if (result.affectedRows == 0) {
//             //If NO ROWS WERE CHANGED, THEN THE ID MUST NOT EXSIST, SO 404 error
//             return res.status(404).end();
//         } else {
//             res.status(200).end();
//         }
//     });
// });

// EXPORT
module.exports = router;
