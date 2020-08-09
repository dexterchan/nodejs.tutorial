const express = require("express");
const expressWs = require("express-ws");

const app = express();

expressWs(app);

const sockets = {};

const PORT = 3001;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.post("/:topicId", (req, res) => {
  const { topicId } = req.params;
  const message = req.body;

  const topicSockets = sockets[topicId] || [];
  for (const socket of topicSockets) {
    socket.send(JSON.stringify(message));
  }
});

app.ws("/:topicId", (socket, req) => {
  const { topicId } = req.params;

  if (!sockets[topicId]) sockets[topicId] = [];
  const topicSockets = sockets[topicId];
  topicSockets.push(socket);

  socket.on("close", () => {
    topicSockets.splice(topicSockets.indexOf(socket), 1);
  });
});

/*
Publisher
(for i in `seq 1 10000`; do sleep 1; echo New Stock Price; done) | NAME=STOCK_BROKER TOPIC_ID=stock_prices node publisher.js
Client
TOPIC_ID=stock_prices node subscriber.js
*/
