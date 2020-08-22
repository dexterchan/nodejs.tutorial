const {
  connectServerProtocolAsync,
  generateMktRequest,
} = require("../utils/basicStomp");

export async function connectMktClient(
  protocol,
  hostname,
  port,
  path,
  mktdatacode,
  callback
) {
  const name = "userA";
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZXIiOiJNYXJrZXQgRGF0YSBTdHJlYW1pbmcgc2VydmljZSBMYW1iZGEiLCJleHAiOjE2MDA2ODM3MDZ9.l0PY08m5kQFcO8jmaAJtUUx_5WSI-S-iLkZZkg7aSMI";
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
