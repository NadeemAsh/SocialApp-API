const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments:[Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: String!): Post!
  }
  type Subscription{
    newPost: Post!
  }
`;

/**
 * Subscriptions work in such a way that, lets say we have our 'newPost' subscription
 * initialized in this case, so whenever a new post is added and those who are subscribed
 * to that post will get notified that yes there is something new happening
 */ 

module.exports = typeDefs;
