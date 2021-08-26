const postsResolvers = require("./posts");
const commentsResolver = require("./comments");
const usersResolvers = require("./users");

//Combine all the resolvers together
module.exports = {
  Post: {
    likeCount: (parent) => {
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolver.Mutation,
  },
};
