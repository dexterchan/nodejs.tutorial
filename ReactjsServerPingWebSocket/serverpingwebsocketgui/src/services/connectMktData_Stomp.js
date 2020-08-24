import axios from "axios";
const {
  connectServerProtocolAsync,
  generateMktRequest,
} = require("../utils/basicStomp");

export async function connectMktClient(
  protocol,
  hostname,
  port,
  path,
  apiKeyValue,
  mktdatacode,
  callback
) {
  const name = "userA";
  const API_KEY = apiKeyValue;
  const tokenURL = "https://api.treequery.org/token";
  const response = await axios.get(tokenURL, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (response.status !== 200) {
    throw new Error("failed to retrieve token");
  }
  const body = response.data;
  const token = body["jwt"];
  const stompClient = await connectServerProtocolAsync(
    protocol,
    hostname,
    port,
    path,
    name,
    token
  );

  const mktRequest = generateMktRequest(mktdatacode);
  stompClient.subscribe("/user/queue/messages", function (output) {
    const mktValue = JSON.parse(output.body);
    const { bid, ask } = mktValue;
    mktValue["Bid"] = bid;
    mktValue["Ask"] = ask;

    callback(mktValue);
  });
  stompClient.send("/app/request", {}, JSON.stringify(mktRequest));
  return stompClient;
}
