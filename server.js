const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const PORT = 9000;
const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(routes);

mongoose.connect('mongodb://localhost/comment_db');
const db = mongoose.connection;

db.on('error', function(err){
    console.log("Mongoose Error", err);
});

db.once('open', function(){
    console.log("Mongoose connection successful.");
});

app.listen(PORT, () => console.log("the server started on PORT: ", PORT));