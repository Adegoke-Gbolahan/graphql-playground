const StudentMutation = require("./mutations/studentMutations.js")
const CourseMutations = require("./mutations/courseMutations.js")
const DepartmentMutations = require("./mutations/departmentMutations.js")
const TeacherMutations = require("./mutations/teacherMutations.js")
const UserMutations = require("./mutations/userMutations.js")

const Mutation = {
...StudentMutation,
...CourseMutations,
...DepartmentMutations,
...TeacherMutations,
...UserMutations
};

module.exports = {
  Mutation,
};
