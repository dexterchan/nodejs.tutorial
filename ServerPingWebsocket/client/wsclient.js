const { argv } = require("yargs");
const { v4: uuidv4 } = require("uuid");
const { connectServerProtocolAsync, sleep } = require("../utils/basic");
let counter = 0;
async function connectMktClientMsg(
  protocol,
  hostname,
  port,
  path,
  mktdatacode
) {
  const vssocket = await connectServerProtocolAsync(
    protocol,
    hostname,
    port,
    path
  );
  sessionid = uuidv4();
  const mktRequest = {
    sessionid,
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  vssocket.send(mktRequest);

  vssocket.on("message", (data) => {
    counter += 1;
    console.log(`${sessionid} ${mktdatacode}:`, data.data);
  });
  //});
}

protocol = argv.protocol;
hostname = argv.hostname;
port = parseInt(argv.port);
mktdatacode = "AAPL 150117C00600000 EQUITY";
connectMktClientMsg(protocol, hostname, port, "blp/mktdata", mktdatacode);
mktdatacode = "AMZN 150117C00600000 EQUITY";

//--protocol=ws --hostname=localhost --port=3000
