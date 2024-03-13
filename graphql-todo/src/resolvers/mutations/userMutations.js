require("dotenv").config();
const { prisma } = require("../../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = process.env;
const userMutations = {
  createUser: async (parent, args, contextValue) => {
    console.log(pubSub)
    try {
      const { data } = args;
      const checkEmail = await prisma.user.findFirst({
        where: { email: data.email },
      });
      const checkUsername = await prisma.user.findFirst({
        where: { username: data.username },
      });
      if (checkEmail) {
        throw new Error(`User with email  ${data.email} already exist.`);
      }
      if (checkUsername) {
        throw new Error(`User with username  ${data.username} already exist.`);
      }
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
      return prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
  userLogin: async (parent, args, context) => {
    try {
      const { email, password } = args;
      const user = await prisma.user.findFirst({
        where: { email },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Incorrect password.");
      }

      const token = jwt.sign({ userId: user.id }, TOKEN_SECRET, {
        expiresIn: "1h", 
      });

      return {
        token,
        user,
      };
    } catch (error) {
      console.error(error.message);
      throw new Error("Authentication failed.");
    }
  },
};

module.exports = userMutations;
