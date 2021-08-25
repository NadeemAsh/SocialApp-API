const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//TypeDefs and Resolvers
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

//Configure Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({ req })
  /**It is taking the requrest body from the callback and forwarding
   * it to the context
   */
});

/**We should connect to our database before we start our server */
mongoose
  .connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server Running at ${res.url}`);
  });
