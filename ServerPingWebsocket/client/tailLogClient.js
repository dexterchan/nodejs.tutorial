const { connectServerAsync, sleep } = require("../utils/basic");

async function getLogs(hostname, port) {
  const vssocket = await connectServerAsync(hostname, port);
  vssocket.emit("/tailLog", "");

  vssocket.on("/tailLog/response", (data) => {
    console.log("receive log data:", data.toString());
  });
}

hostname = "localhost";
port = 3000;

getLogs(hostname, port);
