var express = require ("express"); 
var router = express.Router(); 
var burgers = require ("../models/burger.js");

// CREATE THE ROUTER 

// GET ROUTE TO DISPLAY ALL THE BURGERS IN THE DB 
router.get ("/", function (req, res) {
    burgers.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);         
        res.render("index", hbsObject);       
    });
});


// POST ROUTE TO UPDATE A BURGER WHEN ITS EATEN OR REMADE 
router.post("/api/burgers", function(req, res){
    burgers.create(
        ["burger_name", "devoured"],[req.body.burger_name, false/////here
            // req.body.devoured
        ],
    function(result){ ////here
        // res.json({id: result.insertId});
        res.redirect("/")
    });
    // console.log(result);
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burgers.update({
        devoured: req.body.devoured
    }, condition, function(result){
            if (result.changedRows == 0){
                //If NO ROWS WERE CHANGED, THEN THE ID MUST NOT EXSIST, SO 404 error
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burgers.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            //If NO ROWS WERE CHANGED, THEN THE ID MUST NOT EXSIST, SO 404 error
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// EXPORT 
module.exports = router;  
