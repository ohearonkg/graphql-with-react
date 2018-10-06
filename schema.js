var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLSchema = require("graphql").GraphQLSchema;
var axios = require("axios");

var CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});

var UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: function(parentValue, args) {
        return axios
          .get("http://localhost:3000/companies/" + parentValue.companyId)
          .then(function(res) {
            return res.data;
          });
      }
    }
  }
});

var RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: function(parentValue, args) {
        return axios
          .get("http://localhost:3000/users/" + args.id)
          .then(function(res) {
            return res.data;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
