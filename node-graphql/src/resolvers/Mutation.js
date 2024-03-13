const { v4: uuidv4 } = require("uuid");

const Mutation = {
  createUser(parent, args, { prisma }, info) {
    // const emailTaken = prisma.users.some((user) => {
    //   return user.email == args.email;
    // });

    // if (emailTaken) throw new Error("Email already taken");
    console.log(prisma)
   const user =  prisma.user.create({
      id: uuidv4(),
      ...args.data,
    })

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => {
      return user.id == args.id;
    });

    if (userIndex == -1) throw new Error("User not found!");

    const deletedUsers = db.users.splice(userIndex, 1);

    posts = posts.filter((post) => {
      const match = (post.author = args.id);
      if (match) {
        db.comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    db.comments.filter((comment) => {
      comment.author !== args.id;
    });
    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => {
      return user.id == id;
    });
    if (!user) throw new Error("User not found!");

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => {
        return user.email == args.email;
      });
      if (emailTaken) throw new Error("Email already taken");
    }
    user.email = data.email;
    if (typeof data.name === "string") {
      user.name = data.name;
    }
  },
  createPost(parent, args, { db, pubSub }, info) {
    const checkUser = db.users.some((user) => {
      return user.id == args.data.author;
    });

    if (!checkUser) throw new Error("User not found!");

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    pubSub.publish("New Post alert", {
      post:{
        mutation:"CREATED",
        data:post

      }
    });
    return post;
  },
  deletePost(parent, args, { db, pubSub }, info) {
    const postIndex = db.posts.findIndex((post) => {
      return post.id == args.id;
    });

    if (postIndex == -1) throw new Error("Post not found!");

    const deletedPost = db.posts.splice(postIndex, 1);

    db.comments.filter((comment) => {
      comment.post !== args.id;
    });
    if(deletedPost[0].published){
      pubSub.publish("New Post alert", {
        post:{
          mutation:"DELETED",
          data:post
  
        }
      });
    }
    

    return deletedPost[0];
  },
  createComment(parent, args, { db,pubSub }, info) {
    const checkUser = db.users.some((user) => {
      return user.id == args.data.author;
    });

    if (!checkUser) throw new Error("User not found!");

    const checkPost = db.posts.some((post) => {
      return post.id == args.data.post;
    });

    if (!checkPost || checkPost.publish == false)
      throw new Error("Invalid Post");

    const comment = {
      id: uuidv4(),
      ...args.data,
    };
    db.comments.push(comment);

    pubSub.publish(`comment-${args.data.post}`, {comment});

    return comment;
  },
};
module.exports = Mutation
