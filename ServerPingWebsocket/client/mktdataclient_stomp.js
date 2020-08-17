const { v4: uuidv4 } = require("uuid");
const WebSocket = require("ws");
function generateMktRequest(mktdatacode) {
  const sessionid = uuidv4();
  const mktRequest = {
    sessionid,
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  return mktRequest;
}

const testConnectMktClientMsg = async (
  protocol,
  hostname,
  port,
  path,
  mktdatacode,
  name,
  token
) => {
  const URL = `${protocol}://${hostname}:${port}/${path}`;
  const ws = new WebSocket(URL, []);
  const StompJs = require("@stomp/stompjs");
  const stompClient = StompJs.Stomp.over(ws);

  stompClient.connect(
    { name, token },
    function () {
      stompClient.subscribe("/user/queue/messages", function (output) {
        console.log(output.body);
      });
      console.log("connected");

      console.log("connected");
      const mktRequest = generateMktRequest(mktdatacode);

      stompClient.send("/app/request", {}, JSON.stringify(mktRequest));
    },
    function (err) {
      console.log("error" + err);
    }
  );
};

const protocol = "ws";
const port = 3000;
const hostname = "localhost";
const path = "blp/mktdata";
let mktdatacode = "AAPL 150117C00600000 EQUITY";
const name = "apple";
const token = "abcd";

testConnectMktClientMsg(
  protocol,
  hostname,
  port,
  path,
  mktdatacode,
  name,
  token
);

mktdatacode = "AMZN 150117C00600001 EQUITY";
testConnectMktClientMsg(
  protocol,
  hostname,
  port,
  path,
  mktdatacode,
  name,
  token
);
