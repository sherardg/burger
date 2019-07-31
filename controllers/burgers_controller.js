var express = require ("express"); 
var router = express.Router(); 
var burgers = require ("../models/burger");

// CREATE THE ROUTER 

// GET ROUTE TO DISPLAY ALL THE BURGERS IN THE DB 
router.get ("/", function (req, res) {
    burgers.all(function(burgerData) {
        console.log("burger_name"); 
        // console.log(res);
        res.render("index",{burger_Data: burgerData});         
    });
});

// // POST ROUTE TO UPDATE A BURGER WHEN ITS EATEN OR REMADE 
// router.post("/api/burgers/:id", function (req, res) {
//     burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result){
//         res.json({ id: result.insertID });
//         console.log(req.body); 
//     });
//     });


//     burger.updateBurgers(
//         req.body.devoured, condition, function (result) { 
//             console.log(result); 
//         if (result.changedRows === 0) {
//             return res.status(200).end(); 
//         }
//         else {
//             res.status(200).end(); 
//         }
//     }); 

// // POST TO ADD A NEW BURGER 
// router.post("/api/burgers", function (req, res) {
//     burger.addBurgers([
//         "burger_name", "devoured" 
//     ], 
//     [req.body.name, req.body.devoured], 
//     function (result) {
//         res.json({ id: result.insertId})
//     }); 
// }); 


// EXPORT 
module.exports = router;  
