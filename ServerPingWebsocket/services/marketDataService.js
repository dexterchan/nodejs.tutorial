const { sleep } = required("@utils/basic");
const { logger } = required("@logger");
const { validateMarketDataRequest } = required("@model/marketData");

class MarketDataInterface {
  connect() {}
  subscribe(mktDataRequest, consumerFunc) {}
  disconnect() {}
}

class DummyMarketDataImpl extends MarketDataInterface {
  connect() {
    this.subscriptionMap = {};
    this.timeInterval = 1000;
    this.min = 1;
    this.max = 10;
  }
  dummyData = (mktDataRequest, consumerFunc, ms) =>
    new Promise((resolve, reject) => {
      while (this.subscriptionMap[mktdatacode.mktdatacode]) {
        setTimeout(() => {
          consumerFunc({
            Bid: Math.random() * (this.max - this.min) + this.min,
            Ask: Math.random() * (this.max - this.min) + this.min,
          });
        }, ms);
      }
    });

  subscribe(mktDataRequest, consumerFunc) {
    const rString = JSON.stringify(mktDataRequest);
    validateMarketDataRequest(mktDataRequest);
    logger.info(`Market data subscription on mktdata ${rString}`);
    this.subscriptionMap[mktDataRequest.mktdatacode] = true;
    dummyData(mktDataRequest, consumerFunc, this.timeInterval);
  }
  disconnect() {
    for (let mktdatacode of this.subscriptionMap.keys()) {
      this.subscriptionMap[mktdatacode] = false;
    }
  }
}

module.exports = {
  MarketDataInterface: DummyMarketDataImpl,
};
