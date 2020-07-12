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
    console.log(`${mktdatacode}:`, data);
  });
  //});
}

hostname = "ALB-947481995.us-east-2.elb.amazonaws.com";
hostname = "localhost";
port = 3000;
mktdatacode = "AAPL 150117C00600000 EQUITY";
connectMktClient(hostname, port, mktdatacode);
mktdatacode = "AMZN 150117C00600000 EQUITY";
connectMktClient(hostname, port, mktdatacode);
