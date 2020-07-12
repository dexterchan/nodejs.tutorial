const sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const connectServerAsync = async (hostname, port) =>
  new Promise(async (resolve, reject) => {
    const url = `http://${hostname}:${port}`;
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

module.exports = {
  sleep,
  connectServerAsync,
};
