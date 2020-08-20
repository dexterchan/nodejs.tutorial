const express = require("express");
const cors = require("cors");
const { logger } = require("@logger");

const { error } = require("../middleware/error");
const ping = require("@routes/ping");

const whitelist = ["http://localhost:3000", "http://example2.com"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    /*
    if (whitelist.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
*/
    callback(null, true);
  },
};

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("OK");
  });
  app.get("/mgt/health", (req, res) => {
    res.send("UP from JS");
  });

  const http = require("http").createServer(app);
  const io = require("socket.io")(http, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 5000,
    pingTimeout: 2000,
    handlePreflightRequest: (req, res) => {
      logger.info(`connect from ${req.headers.origin}`);
      const headers = {
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, user, token",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true,
      };
      res.writeHead(200, headers);
      res.end();
    },
  });
  /*
  io.origins((origin, callback) => {
    if (origin !== "https://foo.example.com") {
      return callback("origin not allowed", false);
    }
    callback(null, true);
  });*/
  app.use("/api/ping", ping);

  require("@routes/subscribe")(io);

  app.use(error);
  return [http, io];
};
