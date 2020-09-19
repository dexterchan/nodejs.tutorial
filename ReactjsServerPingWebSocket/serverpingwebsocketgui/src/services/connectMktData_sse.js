const { generateMktRequest } = require("../utils/basicStomp");
const { GetAwsJWTToken } = require("../utils/GetJWTToken");

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
  const { token, expDate } = await GetAwsJWTToken(apiKeyValue);

  const mktRequest = generateMktRequest(mktdatacode);
  stompClient.subscribe("/user/queue/messages", function (output) {
    const mktValue = JSON.parse(output.body);
    const { bid, ask } = mktValue;
    mktValue["Bid"] = bid;
    mktValue["Ask"] = ask;

    callback(mktValue);
  });
  stompClient.send("/app/request", {}, JSON.stringify(mktRequest));
  return { stompClient, expDate };
}
