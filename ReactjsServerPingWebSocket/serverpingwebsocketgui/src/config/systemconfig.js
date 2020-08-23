const CONFIG = {
  test: {
    protocol: "ws",
    mktdataserverhostname: "localhost",
    mktdataserverport: 3000,
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
    mktdataserverport: 3000,
    path: "blp/mktdata",
  },
  dev_stomp: {
    protocol: "ws",
    mktdataserverhostname: "treequery.org",
    mktdataserverport: 80,
    path: "blp/mktdata",
  },
  deploy_stomp: {
    protocol: "wss",
    mktdataserverhostname: "treequery.org",
    mktdataserverport: 443,
    path: "blp/mktdata",
  },
};

module.exports = { CONFIG };
