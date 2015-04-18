var express = require("express");
var config = require("./config.json") || {};

var app = express();

app.use(express.static('static') );
app.get("/", function( req, res ) {
    res.redirect("/game.html");
});
app.listen(config.listenPort);

