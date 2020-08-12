const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT;
const DATA_DIR = process.env.DATA_DIR;
const AWSXRay = require("aws-xray-sdk");

const app = express();
app.use(AWSXRay.express.openSegment("shard"));
app.use(express.json());

app.post("/:key", (req, res) => {
  const { key } = req.params;
  console.log(`Storing data at key ${key}`);

  const destinationFile = `${DATA_DIR}/${key}`;
  fs.writeFileSync(destinationFile, JSON.stringify(req.body));
  res.send(`Done at port${DATA_DIR}`);
});

app.get("/:key", (req, res) => {
  const { key } = req.params;
  console.log(`Retrieving data from key ${key}.`);
  const destinationFile = `${DATA_DIR}/${key}`;
  try {
    const data = fs.readFileSync(destinationFile);
    res.send(data);
  } catch (e) {
    res.send(`null:${e.message}`);
  }
});
app.use(AWSXRay.express.closeSegment());
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//example:
//curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:3000/data
