const database = require("./database");
const express = require("express");
const app = express();
const PORT = 3000;
const TIMELIMIT = 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//Hash Table of previous access time for each user.
const accesses = {};

const checkAccessLimitReturnThrottling = (user) => {
  const previousAccessTime = accesses[user];

  const now = Date.now();
  const diff = now - previousAccessTime;
  console.log(diff);
  if (diff < TIMELIMIT) {
    return true;
  }
  return false;
};

app.get("/index.html", (req, res) => {
  const { user } = req.headers;

  // Limit to 1 request every 5 seconds.
  if (checkAccessLimitReturnThrottling(user)) {
    res.status(429).send("Too Many request. \n");
    return;
  }
  //Business logic continue
  database.get("index.html", (page) => {
    accesses[user] = Date.now();
    res.send(page + "\n");
  });
});

//client curl command:
//curl localhost:3000/index.html -H "user: userA"
