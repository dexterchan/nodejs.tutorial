//import SockJS from "./sockjs";
//import { Stomp } from "./stomp";
//const { Stomp } = require("./stomp");
//const WebSocket = require("ws");
import uuid from "uuid";

function generateMktRequest(mktdatacode) {
  const sessionid = uuid.v4();
  const mktRequest = {
    sessionid,
    mktdatacode,
    fields: ["BID", "ASK"],
  };
  return mktRequest;
}

const connectServerProtocolAsync = async (
  protocol,
  hostname,
  port,
  path,
  name,
  token
) =>
  new Promise((resolve, reject) => {
    const URL = `${protocol}://${hostname}:${port}/${path}`;

    try {
      //const socket = new SockJS(URL);
      const socket = new WebSocket(URL, []);
      //const stompClient = Stomp.over(socket);

      const StompJs = require("@stomp/stompjs");
      const stompClient = StompJs.Stomp.over(socket);

      stompClient.connect(
        { name, token },
        function () {
          console.log("connected");
          resolve(stompClient);
        },
        function (err) {
          reject(err);
        }
      );
    } catch (ex) {
      reject(ex);
    }
  });

export { connectServerProtocolAsync, generateMktRequest };
