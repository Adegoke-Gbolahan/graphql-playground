const { prisma } = require("../database.js");
const { auth } = require("../helpers/verifyToken.js")

const Query = {
    enrollment: (parent, args) => {
      return prisma.student.findMany({
        where: { enrolled: true },
      });
    },
    student: (parent, args) => {
      return prisma.student.findFirst({
        where: { id: Number(args.id) },
      });
    },

    students: (parent, args) => {
      return prisma.student.findMany({});
    },

    departments: (parent, args, { db }, info) => {
      console.log(db)
      return prisma.department.findMany({});
    },

    department: (parent, args) => {
      return prisma.department.findFirst({
        where: { id: Number(args.id) },
      });
    },

    courses: (parent, args) => {
      return prisma.course.findMany({});
    },

    course: (parent, args) => {
      return prisma.course.findFirst({
        where: { id: Number(args.id) },
      });
    },

    teachers: (parent, args) => {
      return prisma.teacher.findMany({});
    },

    teacher: (parent, args) => {
      return prisma.teacher.findFirst({
        where: { id: Number(args.id) },
      });
    },
  userProfile: async (parent, args, context) => {
    try {
      console.log(context.pubsub)
      if(context.user === null){
        throw new Error("Please Authenticate");
      }
      const id = args.id
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      return user
    } catch (error) {
      console.log(error.message)
      throw new Error(error.message);
    }
  }
  };

  module.exports = {
    Query,
  }