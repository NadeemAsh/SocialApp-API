const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { AuthenticationError } = require("apollo-server");
dotenv.config();

module.exports = (context) => {
  // context = {...header}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...token
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    }
    throw new Error('Authentication Token must be "Bearer [token]"');
  }
  throw new Error("Authorization Header must be provided");
};
