const { logger } = require("@logger");
const { MarketDataInterface } = require("@services/marketDataService");
const ClientMap = new Set();

const getConnectedHost = (socket) => socket.handshake.headers.host;

let marketDataInterface;

function onConnect(socket) {
  const connectedHost = getConnectedHost(socket);
  logger.info(`a new connection from ${connectedHost}`);
  ClientMap[socket] = connectedHost;
}

function onDisconnect(socket) {
  socket.on("disconnect", async (socket) => {
    if (socket in ClientMap) {
      const connectedHost = ClientMap[socket];
      logger.info(`disconnect from ${connectedHost}`);
      delete ClientMap[socket];
    }
  });
}

function onMarketDataSubscription(socket) {
  socket.on("//blp/mktdata", async (mktRequest) => {
    marketDataInterface.subscribe(mktRequest, (mktdata) => {
      //logger.info(mktdata);
      socket.emit("//blp/mktdata/response", mktdata);
    });
  });
}

function onRefDataSubscription(socket) {
  socket.on("//blp/refdata", async (refDataRequest) => {});
}

module.exports = (io) => {
  marketDataInterface = new MarketDataInterface();
  marketDataInterface.connect();
  io.on("connection", (socket) => {
    onConnect(socket);
    onDisconnect(socket);
    onMarketDataSubscription(socket);
  });
};
