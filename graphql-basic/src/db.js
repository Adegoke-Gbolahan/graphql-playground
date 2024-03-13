
let users = [
    {
      id: 1,
      name: "gbolahan",
      email: "g@gmail",
      age: 24,
    },
    {
      id: 2,
      name: "sam",
      email: "s@gmail",
    },
    {
      id: 3,
      name: "edina",
      email: "e@gmail",
    },
  ];
  let posts = [
    {
      id: 1,
      title: "Title 1",
      body: "body 1",
      publish: true,
      author: "1",
    },
    {
      id: 2,
      title: "Title 2",
      body: "body 2",
      publish: false,
      author: "1",
    },
    {
      id: 3,
      title: "Title 3",
      body: "body 3",
      publish: true,
      author: "2",
    },
  ];
  let comments = [
    {
      id: "comment1",
      text: "Nice Post",
      author: "1",
      post: "1",
    },
    {
      id: "comment2",
      text: "You are welcome",
      author: "2",
      post: "2",
    },
    {
      id: "comment3",
      text: "Wow wow wow",
      author: "2",
      post: "1",
    },
    {
      id: "comment4",
      text: "I dont like this",
      author: "2",
      post: "1",
    },
  ];
  const db = {
        users,
        posts,
        comments
        
  }

  export default db