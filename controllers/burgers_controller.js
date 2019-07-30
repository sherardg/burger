var express = require ("express"); 
var burger = require ("../models/burger"); 
var router = express.Router(); 

// CREATE THE ROUTER 

// GET ROUTE TO DISPLAY ALL THE BURGERS IN THE DB 
router.get ("/", function (req, res) {
    burger.selectAll(function(data) {
        console.log("before the var"); 
        var burgerObj = {
            burgers: data 
        };
        console.log(burgerObj); 
        res.render("index", burgerObj); 
    });
});

// PUT ROUTE TO UPDATE A BURGER WHEN ITS EATEN OR REMADE 
router.put("/api/burgers/:id", function (req, res) {
    var condition = req.params.id; 
    console.log(condition);
    console.log(req.body); 


    burger.updateBurgers(
        req.body.devoured, condition, function (result) { 
            console.log(result); 
        if (result.changedRows === 0) {
            return res.status(200).end(); 
        }
        else {
            res.status(200).end(); 
        }
    }); 
}); 

// POST TO ADD A NEW BURGER 
router.post("/api/burgers", function (req, res) {
    burger.addBurgers([
        "burger_name", "devoured" 
    ], 
    [req.body.name, req.body.devoured], 
    function (result) {
        res.json({ id: result.insertId})
    }); 
}); 


// EXPORT 
module.exports = router;  
