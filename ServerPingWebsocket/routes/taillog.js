const { logger } = require("@logger");
const config = require("config");
const { tailLogService } = require("../services/taillogService");

function tailLogEndPoint(socket) {
  const logFileName = config.get("logfileName");
  socket.on("/tailLog", async (req) => {
    const socketId = socket.id;
    tailLogService(logFileName, (data) => {
      socket.emit("/tailLog/response", data);
    });
  });
}

module.exports = {
  tailLogEndPoint,
};
