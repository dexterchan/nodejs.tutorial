const express = require("express");
const router = express.Router();
const { sleep } = require("@utils/basic");
const Joi = require("joi");
const os = require("os");

router.get("/time", async (req, res) => {
  const time = new Date(Date.now());
  res.status(200).send(`${os.hostname()}: Time is ${time.toISOString()}`);
});

module.exports = router;
