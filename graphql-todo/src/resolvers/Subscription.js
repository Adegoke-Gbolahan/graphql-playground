const Subscription = {
  count: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const asyncIterator = await pubsub.asyncIterator('COUNT');
      return asyncIterator;
    },
  },
  comment: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.subscribe(`chat`);
    },
  },
};

module.exports = {
  Subscription,
};
