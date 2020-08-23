import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

import {
  connectServerProtocolAsync,
  generateMktRequest,
} from "./utils/basicStomp";
import { ExpansionPanelActions } from "@material-ui/core";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  //const linkElement = getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});

test("connect stomp websocket", async () => {
  const protocol = "ws";
  const hostname = "localhost";
  const port = 3000;
  const path = "blp/mktdata";
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
  expect(stompClient).not.toBeNull();

  stompClient.subscribe("/user/queue/messages", function (output) {
    console.log(output.body);
  });

  console.log("start to subscribe");

  let mktdatacode = "AAPL 150117C00600000 EQUITY";
  const mktRequest = generateMktRequest(mktdatacode);

  stompClient.send("/app/request", {}, JSON.stringify(mktRequest));
}, 1000000);
