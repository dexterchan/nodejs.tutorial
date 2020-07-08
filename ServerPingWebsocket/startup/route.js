const express = require("express");
const cors = require("cors");

const { error } = require("../middleware/error");
const ping = require("@routes/ping");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("OK");
  });

  const http = require("http").createServer(app);
  const io = require("socket.io")(http, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 5000,
    pingTimeout: 2000,
    cookie: false,
  });
  app.use("/api/ping", ping);

  require("@routes/subscribe")(io);

  app.use(error);
  return [http, io];
};
