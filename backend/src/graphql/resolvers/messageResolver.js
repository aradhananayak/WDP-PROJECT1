const Message = require('../../models/Message');

const messageResolver = {
  Query: {
    getMessages: async (_, { chatRoomId, limit, offset }) => {
      return await Message.find({ chatRoom: chatRoomId })
        .skip(offset)
        .limit(limit)
        .populate('sender')
        .populate('chatRoom');
    },
  },
  Mutation: {
    sendMessage: async (_, { chatRoomId, content, senderId }) => {
      const message = new Message({ content, chatRoom: chatRoomId, sender: senderId });
      await message.save();
      return message.populate('sender').populate('chatRoom');
    },
  },
};

module.exports = messageResolver;
