const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const connectServerProtocolAsync = async (
  protocol,
  hostname,
  port,
  path = ""
) =>
  new Promise(async (resolve, reject) => {
    const url = `${protocol}://${hostname}:${port}/${path}`;
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
        upgrade: false,
        transports: ["websocket"],
      });
      vssocket.on("connect", () => {
        resolve(vssocket);
      });
    } catch (ex) {
      reject(ex);
    }
  });

module.exports = {
  sleep,
  connectServerProtocolAsync,
};
