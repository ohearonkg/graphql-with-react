var express = require("express");
var graphql = require("express-graphql");
var schema = require("./schema");

var app = express();

app.use(
  "/graphql",
  graphql({
    schema: schema,
    graphiql: true
  })
);

app.listen("4000", function() {
  console.log("Listening on port 4000");
});
