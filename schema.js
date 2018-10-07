var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var axios = require("axios");

var CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: function() {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      users: {
        type: GraphQLList(UserType),
        resolve: function(parentValue, args) {
          return axios
            .get("http://localhost:3000/companies/" + parentValue.id + "/users")
            .then(function(res) {
              return res.data;
            });
        }
      }
    };
  }
});

var UserType = new GraphQLObjectType({
  name: "User",
  fields: function() {
    return {
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
    };
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
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: function(parentValue, args) {
        return axios
          .get("http://localhost:3000/companies/" + args.id)
          .then(function(res) {
            return res.data;
          });
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLInt }
      },
      resolve: function(parentValue, args) {
        return axios
          .post("http://localhost:3000/users", {
            firstName: args.firstName,
            age: args.age
          })
          .then(function(res) {
            return res.data;
          });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: function(parentValue, args) {
        return axios
          .delete("http://localhost:3000/users/" + args.id)
          .then(function(res) {
            return res.data;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
});
