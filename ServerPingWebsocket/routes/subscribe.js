const { logger } = require("@logger");
const ClientPool = new Set();

function onConnect(socket) {
  const connectedHost = socket.handshake.headers.host;
  logger.info(`a new connection from ${connectedHost}`);
  ClientPool.add(socket);
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    onConnect(socket);
  });
};
