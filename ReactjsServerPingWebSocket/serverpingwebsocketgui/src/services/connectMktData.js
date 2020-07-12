const { connectServerAsync } = require("../utils/basic");

async function connectMktClient(hostname, port, mktdatacode, callback) {
  const vssocket = await connectServerAsync(hostname, port);

  const mktRequest = {
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  vssocket.emit("//blp/mktdata", mktRequest);

  vssocket.on("//blp/mktdata/response", (data) => {
    callback(data);
  });
}

module.exports = {
  connectMktClient,
};
