const { sleep } = require("@utils/basic");
const { logger } = require("@logger");
const { validateMarketDataRequest } = require("@model/marketData");

class MarketDataInterface {
  connect() {}
  subscribe(mktDataRequest, consumerFunc) {}
  disconnect() {}
}

class DummyMarketDataImpl extends MarketDataInterface {
  connect() {
    this.subscriptionMap = {};
    this.timeInterval = 200;
    this.min = 1;
    this.max = 10;
  }
  dummyData = (mktDataRequest, consumerFunc, ms) =>
    new Promise((resolve, reject) => {
      this.subscriptionMap[mktDataRequest.mktdatacode] = setInterval(() => {
        consumerFunc({
          Bid: Math.random() * (this.max - this.min) + this.min,
          Ask: Math.random() * (this.max - this.min) + this.min,
        });
      }, ms);
    });

  subscribe(mktDataRequest, consumerFunc) {
    const rString = JSON.stringify(mktDataRequest);
    validateMarketDataRequest(mktDataRequest);
    logger.info(`Market data subscription on mktdata ${rString}`);
    this.dummyData(mktDataRequest, consumerFunc, this.timeInterval);
  }
  disconnect() {
    Object.entries(this.subscriptionMap).forEach(([key, value]) => {
      clearInterval(this.subscriptionMap[key]);
    });
  }
}

module.exports = {
  MarketDataInterface: DummyMarketDataImpl,
};
