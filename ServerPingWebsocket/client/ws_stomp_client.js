const { v4: uuidv4 } = require("uuid");

const protocol = "ws";
const port = 8080;
const hostname = "localhost";
const path = "chat";
const mktdatacode = "AAPL 150117C00600000 EQUITY";

const URL = `${protocol}://${hostname}:${port}/${path}`;

const sessionid = uuidv4();
const mktRequest = {
  sessionid,
  mktdatacode,
  fields: ["BID", "ASK"],
};

const userName = "abcd";

const WebSocket = require("ws");
const ws = new WebSocket(URL, []);
const StompJs = require("@stomp/stompjs");
const stompClient = StompJs.Stomp.over(ws);

stompClient.connect(
  { username: userName },
  function () {
    stompClient.subscribe("/topic/broadcast", function (output) {
      console.log(output.body);
    });
    stompClient.subscribe("/topic/active", function () {
      console.log("subscribed");
    });
    stompClient.subscribe("/user/queue/messages", function (output) {
      console.log(output.body);
    });
    console.log("connected");

    stompClient.send(
      "/app/chat",
      { sender: userName },
      JSON.stringify({ from: userName, text: "Hello!", recipient: userName })
    );
  },
  function (err) {
    alert("error" + err);
  }
);
