const messagingApi = require("./messaging_api");

const TOPIC_ID = process.env.TOPIC_ID;

const displayMessage = (message) =>
  console.log(`> ${message.name}: ${message.text}`);

function streamMessages() {
  const messageSocket = messagingApi.subscribe(TOPIC_ID);

  messageSocket.on("message", (data) => {
    const message = JSON.parse(data);
    displayMessage(message);
  });
}

streamMessages();
