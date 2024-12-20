const userResolver = require('./userResolver');
const messageResolver = require('./messageResolver');
const chatRoomResolver = require('./chatRoomResolver');

module.exports = [userResolver, messageResolver, chatRoomResolver];
