const { hashString, computeScore } = require("./hashing_utils");

const serverSet1 = [
  "server0",
  "server1",
  "server2",
  "server3",
  "server4",
  "server5",
];

const serverSet2 = ["server0", "server1", "server2", "server3", "server4"];

const usernames = [
  "username0",
  "username1",
  "username2",
  "username3",
  "username4",
  "username5",
  "username6",
  "username7",
  "username8",
  "username9",
];

function pickServerSimple(username, servers) {
  const hash = hashString(username);
  return servers[hash % servers.length];
}

function pickServerRendezvous(username, servers) {
  let maxServer = null;
  let maxScore = null;

  for (const server of servers) {
    const score = computeScore(username, server);
    if (maxScore === null || score > maxScore) {
      maxScore = score;
      maxServer = server;
    }
  }
  return maxServer;
}

console.log("Simple hashing Stategy");

for (const username of usernames) {
  const server1 = pickServerSimple(username, serverSet1);
  const server2 = pickServerSimple(username, serverSet2);
  const serversAreEqual = server1 === server2;
  console.log(
    `${username}: ${server1} ==> ${server2} | equal: ${serversAreEqual}`
  );
}

console.log("Rendezvous hashing Stategy");

for (const username of usernames) {
  const server1 = pickServerRendezvous(username, serverSet1);
  const server2 = pickServerRendezvous(username, serverSet2);
  const serversAreEqual = server1 === server2;
  console.log(
    `${username}: ${server1} ==> ${server2} | equal: ${serversAreEqual}`
  );
}