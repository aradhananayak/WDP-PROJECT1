const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const MESSAGE_ADDED = 'MESSAGE_ADDED';

module.exports = { pubsub, MESSAGE_ADDED };
