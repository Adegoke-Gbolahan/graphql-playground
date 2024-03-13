const { prisma } = require("../../database.js");

const departmentMutations = {
  createDepartment: (parent, args) => {
    return prisma.department.create({
      data: {
        name: args.name,
        description: args.description,
      },
    });
  },
  updateDepartment: async (parent, args,{pubsub}) => {
    try {
      const { id, data } = args;
      const department = await prisma.department.findFirst({
        where: { id: parseInt(id) },
      });

      if (!department) {
        throw new Error(`Department with ID ${id} not found.`);
      }
      pubsub.publish("chat", {
        comment:"Update Department"
      });
      const updateedDepartment = await prisma.department.update({
        where: {
          id: parseInt(id),
        },
        data,
      });

      return updateedDepartment;
    } catch (error) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  },
  deleteDepartment: async (parent, args) => {
    try {
      const department = await prisma.department.findFirst({
        where: { id: parseInt(args.id) },
      });

      if (!department) {
        throw new Error(`Department with ID ${args.id} not found.`);
      }

      await prisma.department.delete({
        where: {
          id: parseInt(args.id),
        },
      });

      return department;
    } catch (error) {
      throw new Error(`Error deleting department: ${error.message}`);
    }
  },
};

module.exports = departmentMutations;
