var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLSchema = require("graphql").GraphQLSchema;

/**
 * Temporary Hardcoded List of Users
 */
var users = [
  {
    id: "1",
    firstName: "Kevin",
    age: 25
  },
  {
    id: "2",
    firstName: "Sarah",
    age: 26
  }
];

var UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

var RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: function(parentValue, args) {
        return users.find(function(user) {
          return user.id === args.id;
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
