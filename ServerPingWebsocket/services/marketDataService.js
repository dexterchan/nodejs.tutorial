const { sleep } = require("@utils/basic");
const { logger } = require("@logger");
const { validateMarketDataRequest } = require("@model/marketData");
const { MarketDataSubject } = require("@model/Subject");
const { MktDataObserver } = require("@model//Observer");

class MarketDataInterface {
  connect() {}
  subscribe(clientId, mktDataRequest, consumerFunc) {}
  disconnect() {}
}

class DummyMarketDataImpl extends MarketDataInterface {
  connect() {
    this.subscriptionMap = {};
    this.timeInterval = 200;
    this.min = 1;
    this.max = 10;
    this.subjectMap = {};
    this.isAlive = true;
    this.___listenData();
  }

  ___listenData = () => {
    new Promise(async (resolve, reject) => {
      while (this.isAlive) {
        Object.entries(this.subjectMap).forEach(([mktdatacode, subject]) => {
          subject.notifyObservers(this.pollMarketData(mktdatacode));
        });
        await sleep(this.timeInterval);
      }
    });
  };
  subscribe(clientId, mktDataRequest, consumerFunc) {
    const rString = JSON.stringify(mktDataRequest);
    validateMarketDataRequest(mktDataRequest);
    logger.info(`Market data subscription on mktdata ${rString}`);
    this.__addSubscription(clientId, mktDataRequest.mktdatacode, consumerFunc);
  }
  unsubscribe(clientId, mktdatacode) {
    if (mktdatacode in this.subjectMap) {
      this.subjectMap[mktdatacode].removeObserver(clientId);
    }
  }
  unsubscribeAll(clientId) {
    this.subjectMap;
    Object.entries(this.subjectMap).forEach(([mktdatacode, subject]) => {
      this.unsubscribe(clientId, mktdatacode);
    });
  }

  __addSubscription(clientId, mktdatacode, consumerFunc) {
    const mktdataObserver = new MktDataObserver(clientId, consumerFunc, null);
    if (!(mktdatacode in this.subjectMap)) {
      this.subjectMap[mktdatacode] = new MarketDataSubject(mktdatacode);
    }
    this.subjectMap[mktdatacode].registerObserver(mktdataObserver);
  }
  disconnect() {
    this.isAlive = false;
  }
  pollMarketData(mktdatacode) {
    const amzn = /AMZN (\w*) EQUITY/;
    const apple = /AAPL (\w*) EQUITY/;
    let basePrice = 0;
    if (mktdatacode.match(amzn)) {
      basePrice = 3200 + (Math.random() * (this.max - this.min) + this.min);
    } else if (mktdatacode.match(apple)) {
      basePrice = 380 + (Math.random() * (this.max - this.min) + this.min);
    } else {
      basePrice = Math.random() * (this.max - this.min) + this.min;
    }

    return {
      timestamp_ms: new Date().getTime(),
      mktdatacode,
      Bid: basePrice * 1.05,
      Ask: basePrice * 0.95,
    };
  }
}

module.exports = {
  MarketDataInterface: DummyMarketDataImpl,
};
