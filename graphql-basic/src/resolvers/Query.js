
const  Query = {
    greeting(parent, args, { db }, info) {
      if (args.name) {
        return `Hello ${args.name}`;
      } else {
        return "Hello!";
      }
    },
    users(parent, args, { db }, info) {
      if (!args.query) {
        return users;
      }
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }
      return db.posts.filter((user) => {
        return posts.title.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    post() {
      return {
        id: "post123",
        title: " Testing Title",
        body: "Post Title",
        publish: true,
      };
    },
    comments(parent, args, { db }, info) {
      if (!args.query) {
        return db.comments;
      }
      return db.comments.filter((comment) => {
        return comment.text.toLowerCase().includes(args.query.toLowerCase());
      });
    },
  };

  export default Query