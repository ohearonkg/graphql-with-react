var express = require("express");
var graphql = require("express-graphql");
var schema = require("./schema");

var app = express();

app.use(
  "/graphql",
  graphql({
    graphiql: true,
    schema: schema
  })
);

app.listen("4000", function() {
  console.log("Listening on port 4000");
});
