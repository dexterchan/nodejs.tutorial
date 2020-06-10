const { logger } = require("@logger");
const { MarketDataInterface } = require("@services/marketDataService");
const ClientPool = new Set();

const getConnectedHost = (socket) => socket.handshake.headers.host;

const marketDataInterface = new MarketDataInterface();
marketDataInterface.connect();

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
  socket.on("//blp/mktdata", async (mktRequest) => {
    marketDataInterface.subscribe(mktRequest, (mktdata) => {
      logger.info(mktdata);
      socket.emit("//blp/mktdata/response", mktdata);
    });
  });
}

function onRefDataSubscription(socket) {
  socket.on("//blp/refdata", async (refDataRequest) => {});
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    onConnect(socket);
    onDisconnect(socket);
    onMarketDataSubscription(socket);
  });
};
