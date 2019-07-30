//REQUIREMENTS
var express = require("express");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

//USE PUBLIC FOLDER FOR HTML

app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

//JSON PARSING
app.use(express.urlencoded( { extended: true}));
app.use(express.json());


//USE HANDLEBARS AS THE VIEW ENGINE
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//ROUTING
var routes = require("./controllers/burgers_controller");

app.use(routes);

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});