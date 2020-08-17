const { connectServerProtocolAsync, sleep } = require("../utils/basic");

async function getLogs(hostname, port) {
  const vssocket = await connectServerProtocolAsync("ws", hostname, port);
  vssocket.emit("/tailLog", "");

  vssocket.on("/tailLog/response", (data) => {
    console.log("receive log data:", data.toString());
  });
}

hostname = "localhost";
port = 3000;

getLogs(hostname, port);
