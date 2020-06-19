class MarketDataSubject {
  constructor(mktdatacode) {
    this.mktdatacode = mktdatacode;
    this.observers = {};
  }
  notifyObservers(msg) {
    for (let observerKey in this.observers) {
      this.observers[observerKey].update(msg);
    }
  }
  registerObserver(observer) {
    this.observers[observer.clientId] = observer;
  }
  removeObserver(clientId) {
    delete this.observers[clientId];
  }
}
module.exports = {
  MarketDataSubject,
};
