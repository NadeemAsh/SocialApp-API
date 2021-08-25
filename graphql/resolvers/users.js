const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
dotenv.config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );
}

module.exports = {
  Mutation: {
    /**First Parameter is the parent parameter which has been replaced
     * with an underscore. Parent param holds the result from the last
     * resolver or the parent or simply the last input
     *
     * Second is the context which is the value or the parameter passed in
     * the typeDefiniton of Mutation which in this case is RegisterInput
     *
     * Info is the meta data
     */
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }

      //Get User From Database
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User Not Found!";
        throw new UserInputError("User Not Found!", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Invalid Password!";
        throw new UserInputError("Username or Password is Incorrect", {
          errors,
        });
      }

      //Issue a token for Authentication
      const token = generateToken(user);

      //Return the result
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //TODO: Validate User Data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }
      //TODO: Make sure the user doesnt already exists
      const db_username = await User.findOne({ username });
      const db_email = await User.findOne({ email });
      if (db_username) {
        throw new UserInputError("Username is already taken", {
          //This payload and specifically the errors will be used
          //to dislay information on our frontend
          errors: {
            username: "Try changing Username as it is already taken.",
          },
        });
      } else if (db_email) {
        throw new UserInputError("Email already exists", {
          //This payload and specifically the errors will be used
          //to dislay information on our frontend
          errors: {
            username: "Same Email cannot be used with multiple accounts",
          },
        });
      }
      //TODO: Hash the password and create Auth token DONE
      //Hash Password
      password = await bcrypt.hash(password, 12);

      //Model our new User
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      //Create a new User and save in database
      const res = await newUser.save();

      //Generate a token for Authentication
      const token = generateToken(res);

      //Return the result
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
