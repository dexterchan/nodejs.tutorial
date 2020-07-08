const { connectServerAsync, sleep } = require("../utils/basic");
let counter = 0;
async function connectMktClient(hostname, port, mktdatacode) {
  //return new Promise(async (resolve, reject) => {
  const vssocket = await connectServerAsync(hostname, port);

  const mktRequest = {
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  vssocket.emit("//blp/mktdata", mktRequest);

  vssocket.on("//blp/mktdata/response", (data) => {
    counter += 1;
    console.log("receive mkt data:", data);
  });
  //});
}

hostname = "localhost";
port = 3000;
mktdatacode = "AAPL 150117C00600000 EQUITY";
connectMktClient(hostname, port, mktdatacode);
