const { prisma } = require("../../database.js");

const courseMutations = {
  createCourse: (parent, args) => {
    console.log(parent, args);
    return prisma.course.create({
      data: {
        code: args.code,
        title: args.title,
        teacher: args.teacherEmail && {
          connect: { email: args.teacherEmail },
        },
      },
    });
  },
};

module.exports = courseMutations;
