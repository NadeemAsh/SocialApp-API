const postsResolvers = require('./posts');
const commentsResolver = require('./comments');
const usersResolvers = require('./users');

//Combine all the resolvers together
module.exports = {
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolver.Mutation
    }
}