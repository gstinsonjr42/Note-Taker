const express = require("express");
//const {Server} = require("http");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//tell node we are creating an express server
var app = express();

//port
var PORT = process.env.PORT || 8082;

//set up parsing, static, route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//listen for port
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });