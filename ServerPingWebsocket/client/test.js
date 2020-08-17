const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");
const PORT = 3000;
const hostname = "localhost";
const path = "blp/mktdata";
const mktdatacode = "AAPL 150117C00600000 EQUITY";

const connectMktClientMsg = async (
  protocol,
  hostname,
  port,
  path,
  mktdatacode
) => {
  const URL = `${protocol}://${hostname}:${port}/${path}`;
  const ws = new WebSocket(URL, []);
  const sessionid = uuidv4();
  const mktRequest = {
    sessionid,
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  ws.onopen = () => {
    ws.send(JSON.stringify(mktRequest));
  };

  ws.onmessage = function (data) {
    console.log(data.data);
  };
  return ws;
};

connectMktClientMsg("ws", hostname, PORT, path, "AAPL 150117C00600000 EQUITY");

connectMktClientMsg("ws", hostname, PORT, path, "AMZN 150117C00600001 EQUITY");
