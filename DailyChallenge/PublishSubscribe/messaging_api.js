const axios = require("axios");
const WebSocket = require("ws");
const PORT = 3001;

const publish = (message, topicId) => {
  return axios.post(`http://localhost:${PORT}/${topicId}`, message);
};

const subscribe = (topicId) => {
  return new WebSocket(`ws://localhost:${PORT}/${topicId}`);
};

module.exports = {
  publish,
  subscribe,
};
