const CONFIG = {
  test: {
    protocol: "ws",
    mktdataserverhostname: "localhost",
    mktdataserverport: 5000,
    path: "",
  },
  dev: {
    protocol: "ws",
    mktdataserverhostname: "treequery.org",
    mktdataserverport: 80,
    path: "",
  },
  deploy: {
    protocol: "wss",
    mktdataserverhostname: "treequery.org",
    mktdataserverport: 443,
    path: "",
  },
  test_stomp: {
    protocol: "ws",
    mktdataserverhostname: "localhost",
    mktdataserverport: 5000,
    path: "blp/mktdata",
  },
};

module.exports = { CONFIG };
