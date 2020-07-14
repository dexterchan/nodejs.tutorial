const {
  connectServerAsync,
  connectServerProtocolAsync,
} = require("../utils/basic");

export async function connectMktClient(
  protocol,
  hostname,
  port,
  mktdatacode,
  callback
) {
  const vssocket = await connectServerProtocolAsync(protocol, hostname, port);

  const mktRequest = {
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  vssocket.emit("//blp/mktdata", mktRequest);

  vssocket.on("//blp/mktdata/response", (data) => {
    callback(data);
  });
}
