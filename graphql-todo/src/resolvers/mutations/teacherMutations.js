const { prisma } = require("../../database.js");

const teacherMutations = {
  createTeacher: (parent, args) => {
    return prisma.teacher.create({
      data: {
        email: args.data.email,
        fullName: args.data.fullName,
        courses: {
          create: args.data.courses,
        },
      },
    });
  },
};

module.exports = teacherMutations;
