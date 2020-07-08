const { logger } = require("@logger");
const { MarketDataInterface } = require("@services/marketDataService");
const ClientMap = new Set();

const getConnectedHost = (socket) => socket.handshake.headers.host;

let marketDataInterface;

function onConnect(socket) {
  const connectedHost = getConnectedHost(socket);
  const socketId = socket.id;
  const clientIp = socket.request.connection.remoteAddress;
  logger.info(`a new connection from ${clientIp}`);
  ClientMap[socketId] = clientIp;
}

function onDisconnect(socket) {
  socket.on("disconnecting", (msg) => {
    const socketId = socket.id;
    const clientIp = socket.request.connection.remoteAddress;
    logger.info(`detect disconnection ${socketId} ${msg}`);
    console.log(`detect disconnection ${socketId} ${msg}`);
    if (socketId in ClientMap) {
      const clientIp = ClientMap[socketId];
      logger.info(`disconnect from ${clientIp} and clear subscription`);
      console.log(`disconnect from ${clientIp} and clear subscription`);
      marketDataInterface.unsubscribeAll(socketId);

      delete ClientMap[socketId];
    }
  });
}

function onMarketDataSubscription(socket) {
  socket.on("//blp/mktdata", async (mktRequest) => {
    logger.debug("Socket id:" + socket.id);
    marketDataInterface.subscribe(socket.id, mktRequest, (mktdata) => {
      //logger.info(mktdata);
      socket.emit("//blp/mktdata/response", mktdata);
    });
  });
}

function onRefDataSubscription(socket) {
  socket.on("//blp/refdata", async (refDataRequest) => {});
}

const { tailLogEndPoint } = require("./taillog");
module.exports = (io) => {
  marketDataInterface = new MarketDataInterface();
  marketDataInterface.connect();
  io.sockets.on("connection", (socket) => {
    onConnect(socket);
    onDisconnect(socket);
    onMarketDataSubscription(socket);
    tailLogEndPoint(socket);
  });
};
