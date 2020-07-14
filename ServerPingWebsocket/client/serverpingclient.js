const { argv } = require("yargs");

const {
  connectServerAsync,
  connectServerProtocolAsync,
  sleep,
} = require("../utils/basic");
let counter = 0;
async function connectMktClient(protocal, hostname, port, mktdatacode) {
  //return new Promise(async (resolve, reject) => {
  //const vssocket = await connectServerAsync(hostname, port);
  const vssocket = await connectServerProtocolAsync(protocol, hostname, port);

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

protocol = argv.protocol;
hostname = argv.hostname;
port = parseInt(argv.port);
mktdatacode = "AAPL 150117C00600000 EQUITY";
connectMktClient(protocol, hostname, port, mktdatacode);
mktdatacode = "AMZN 150117C00600000 EQUITY";
connectMktClient(protocol, hostname, port, mktdatacode);
