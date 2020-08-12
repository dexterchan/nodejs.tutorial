const express = require("express");
const axios = require("axios");
const e = require("express");
const AWSXRay = require("aws-xray-sdk");

const SHARD_ADDRESSES = ["http://localhost:4000", "http://localhost:4001"];
const PORT = process.env.PORT || 3001;
const SHARD_COUNT = SHARD_ADDRESSES.length;

const app = express();
app.use(AWSXRay.express.openSegment("shard"));

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
app.use(AWSXRay.express.closeSegment());
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//example:
//curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
