import io from "socket.io-client";
const connectServerAsync = async (hostname, port) =>
  new Promise(async (resolve, reject) => {
    const url = `http://${hostname}:${port}`;
    try {
      const vssocket = io(url, {
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

export { connectServerAsync };
