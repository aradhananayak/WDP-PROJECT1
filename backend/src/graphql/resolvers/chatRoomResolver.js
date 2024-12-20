const ChatRoom = require('../../models/ChatRoom');
const User = require('../../models/User');

const chatRoomResolver = {
  Query: {
    getChatRooms: async () => {
        try {
            return await ChatRoom.find().populate('participants messages');
        } catch (error) {
            throw new Error('Failed to fetch chat rooms');
        }
    },
  },
  Mutation: {
    createChatRoom: async (_, { name, participantIds }) => {
      const participants = await User.find({ _id: { $in: participantIds } });
      const chatRoom = new ChatRoom({ name, participants });
      await chatRoom.save();
      return chatRoom.populate('participants');
    },
  },
};

module.exports = chatRoomResolver;
