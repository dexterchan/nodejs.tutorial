import io from "socket.io-client";

const connectServerProtocolAsync = async (protocol, hostname, port) =>
  new Promise(async (resolve, reject) => {
    const url = `${protocol}://${hostname}:${port}`;
    try {
      const vssocket = require("socket.io-client")(url, {
        transportOptions: {
          polling: {
            extraHeaders: {
              user: "pigpig",
              token: "abcd",
            },
          },
        },
      });
      vssocket.on("connect", () => {
        resolve(vssocket);
      });
    } catch (ex) {
      reject(ex);
    }
  });
export { connectServerProtocolAsync };
