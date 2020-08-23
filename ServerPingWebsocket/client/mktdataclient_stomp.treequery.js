const { argv } = require("yargs");
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

const protocol = argv.protocol;
const hostname = argv.hostname;
const port = parseInt(argv.port);
const path = "blp/mktdata";

const name = "user1";
const tokenURL = "https://api.treequery.org/token";
axios
  .get(tokenURL, {
    headers: {
      "x-api-key": "RQVRk1f71c4iGP3jNCHSB9L72OHJkc1s9w18VWcP",
    },
  })
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
