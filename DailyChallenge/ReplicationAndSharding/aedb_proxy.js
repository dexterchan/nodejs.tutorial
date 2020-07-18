const express = require("express");
const axios = require("axios");
const e = require("express");

const SHARD_ADDRESSES = ["http://localhost:4000", "http://localhost:4001"];
const PORT = process.env.PORT || 3001;
const SHARD_COUNT = SHARD_ADDRESSES.length;

const app = express();
app.use(express.json());

function getShardEndpoint(key) {
  const shardNumber = key.charCodeAt(0) % SHARD_COUNT;
  const shardAddress = SHARD_ADDRESSES[shardNumber];
  return `${shardAddress}/${key}`;
}

app.post("/:key", async (req, res) => {
  const { key } = req.params;
  console.log("post proxy");

  const shardEndpoint = getShardEndpoint(key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  try {
    const innerRes = await axios.post(shardEndpoint, req.body);
    if (innerRes.status == 200) {
      console.log(innerRes);
      res.send(innerRes.data);
    } else {
      throw e;
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(401);
  }
});

app.get("/:key", async (req, res) => {
  const { key } = req.params;

  const shardEndpoint = getShardEndpoint(key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  const innerRes = await axios.get(shardEndpoint);
  if (innerRes.status != 200) {
    res.sendStatus(innerRes.status);
  } else {
    res.send(innerRes.data);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
