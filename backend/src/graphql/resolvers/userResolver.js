const User = require('../../models/User');

const userResolver = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
  },
};

module.exports = userResolver;
