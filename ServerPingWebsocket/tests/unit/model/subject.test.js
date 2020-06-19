const { MarketDataSubject } = require("../../../model/Subject");
const { MktDataObserver } = require("../../../model/Observer");

describe("Test Market Data subscription in Observer pattern", () => {
  const msgQueue = [];
  const consumerFunc = (msg) => {
    msgQueue.push(msg);
  };
  const throwFunc = (msg) => {
    console.log(`throw: ${msg}`);
  };

  it("should insert and notify observer", () => {
    mktdatacode = "AAPL 150117C00600000 EQUITY";
    mktDataObserver = new MktDataObserver("abcd", consumerFunc, throwFunc);
    mktDataObserver2 = new MktDataObserver("def", consumerFunc, throwFunc);
    marketDataSubject = new MarketDataSubject(mktdatacode);
    marketDataSubject.registerObserver(mktDataObserver);
    marketDataSubject.registerObserver(mktDataObserver2);
    msg = {
      Bid: 1,
      Ask: 1,
    };
    marketDataSubject.notifyObservers(msg);
    expect(msgQueue.length).toBe(1 * 2);
    marketDataSubject.notifyObservers(msg);
    expect(msgQueue.length).toBe(2 * 2);
    marketDataSubject.removeObserver("abcd");
    marketDataSubject.notifyObservers(msg);
    expect(msgQueue.length).toBe(2 * 2 + 1);
  });
});
