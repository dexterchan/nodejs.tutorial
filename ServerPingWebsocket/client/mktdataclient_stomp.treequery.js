const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
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

const protocol = "wss";
const port = 443;
const hostname = "treequery.org";
const path = "blp/mktdata";

const name = "apple";
const tokenURL = "https://api.treequery.org/marketdatatoken";
axios
  .get(tokenURL)
  .then(function (response) {
    // handle success
    if (response.status != 200) {
      throw new Error("failed to retrieve token");
    }
    const body = response.data;
    const jwt_token = body["jwt"];

    let mktdatacode = "AAPL 150117C00600000 EQUITY";
    testConnectMktClientMsg(
      protocol,
      hostname,
      port,
      path,
      mktdatacode,
      name,
      jwt_token
    );

    mktdatacode = "AMZN 150117C00600001 EQUITY";
    testConnectMktClientMsg(
      protocol,
      hostname,
      port,
      path,
      mktdatacode,
      name,
      jwt_token
    );
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

/*
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZXIiOiJNYXJrZXQgRGF0YSBTdHJlYW1pbmcgc2VydmljZSBMYW1iZGEiLCJleHAiOjE2MDA1MTA5NDZ9.UDP9ayzdohZqqTrPnZlJLTWHb9mrhCZut1WDbD_FFI0";

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
*/
