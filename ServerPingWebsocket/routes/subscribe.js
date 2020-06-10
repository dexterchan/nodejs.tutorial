const { logger } = require("@logger");
const ClientPool = new Set();

const getConnectedHost = (socket) => socket.handshake.headers.host;

function onConnect(socket) {
  const connectedHost = getConnectedHost(socket);
  logger.info(`a new connection from ${connectedHost}`);
  ClientPool.add(socket);
}

function onDisconnect(socket) {
  socket.on("disconnect", async (socket) => {
    const connectedHost = getConnectedHost(socket);
    logger.info(`disconnect from ${connectedHost}`);
    ClientPool.delete(socket);
  });
}

function onMarketDataSubscription(socket) {
  socket.on("//blp/mktdata", async (socket) => {});
}

function onRefDataSubscription(socket) {
  socket.on("//blp/refdata", async (socket) => {});
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    onConnect(socket);
    onDisconnect(socket);
    onMarketDataSubscription(socket);
  });
};
