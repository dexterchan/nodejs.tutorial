const { logger } = require("@logger");
class MarketDataSubject {
  constructor(mktdatacode) {
    this.mktdatacode = mktdatacode;
    this.observers = {};
  }
  notifyObservers(msg) {
    for (let observerKey in this.observers) {
      //logger.info("publish data to " + observerKey + ":" + JSON.stringify(msg));
      this.observers[observerKey].update(msg);
    }
  }
  registerObserver(observer) {
    this.observers[observer.clientId] = observer;
  }
  removeObserver(clientId) {
    if (clientId in this.observers) delete this.observers[clientId];
  }
}
module.exports = {
  MarketDataSubject,
};
