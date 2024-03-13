const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0;

      //broadcast takes place here
      setInterval(() => {
        count++, pubSub.publish("count", { count });
      }, 1000);

      return pubSub.subscribe("count");
    },
  },
  comment: {
    subscribe(parent, { postId }, { pubSub, db }, info) {

      const post = db.posts.find((post) => post.id == postId && post.published)

      if(!post) throw new Error("Post not found")

      return pubSub.subscribe(`comment-${postId}`);
    },
  },
  post:{
    subscribe(parent, args, { pubSub, db }, info){
        return pubSub.subscribe("New Post alert");
    }
  }
};

export default Subscription;
