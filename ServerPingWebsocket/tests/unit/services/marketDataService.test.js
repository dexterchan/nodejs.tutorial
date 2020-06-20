const { MarketDataInterface } = require("@services/marketDataService");
const { sleep } = require("@utils/basic");
const { logger } = require("@logger");
let marketDataInterface;
const WAIT_MS = 1 * 1000;

describe("market Date service", () => {
  beforeEach(() => {
    marketDataInterface = new MarketDataInterface();
    marketDataInterface.connect();
  });

  it(
    "should subscribe market data",
    async () => {
      const mktRequest = {
        mktdatacode: "AAPL 150117C00600000 EQUITY",
        fields: ["BID", "ASK"],
      };
      marketDataInterface.subscribe("abcd", mktRequest, (mktdata) => {
        logger.info(mktdata);
      });
      await sleep(WAIT_MS);
    },
    WAIT_MS * 2
  );

  afterEach(() => {
    marketDataInterface.disconnect();
  });
});
