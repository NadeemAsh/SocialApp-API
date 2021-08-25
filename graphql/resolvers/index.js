const postsResolvers = require('./posts');
const usersResolvers = require('./users');

//Combine all the resolvers together
module.exports = {
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    }
}