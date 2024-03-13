const { prisma } = require("../database.js");
require("dotenv").config();
const { TOKEN_SECRET } = process.env;
const jwt = require("jsonwebtoken");

const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const decodedToken = jwt.verify(token, TOKEN_SECRET);

    if (!decodedToken.userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
const auth = async (user) => {
  if (user === null) {
    throw new Error("Please Authenticate");
  }
};
module.exports = { getUser, auth };
