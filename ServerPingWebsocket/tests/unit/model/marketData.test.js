const {
  validateMarketDataRequest,
  validateReferenceDataRequest,
} = require("../../../model/marketData");

describe("check subscription request format ", () => {
  it("should verify ok for the market data request format", () => {
    const mktRequest = {
      mktdatacode: "AAPL 150117C00600000 EQUITY",
    };
    const { error } = validateMarketDataRequest(mktRequest);
    expect(error).toBeNull();
  });

  it("should return exception for the Reference data request format", () => {
    const refRequest = {
      securities: ["SPY US EQUITY", "AAPL 150117C00600000 EQUITY"],
      fields: ["BID", "ASK"],
    };
    const { error } = validateReferenceDataRequest(refRequest);
    expect(error).not.toBeNull();
    //console.log(error);
    refRequest["requestType"] = "HistoricalDataRequest";
    const { error2 } = validateReferenceDataRequest(refRequest);
    expect(error2).toBeUndefined();
    if (error2) {
      console.log("return error");
    }
  });
});
