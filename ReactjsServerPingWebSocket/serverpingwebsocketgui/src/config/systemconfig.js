const CONFIG = {
  test: {
    protocol: "ws",
    mktdataserverhostname: "localhost",
    mktdataserverport: 5000,
  },
  dev: {
    protocol: "wss",
    mktdataserverhostname: "treequery.org",
    mktdataserverport: 443,
  },
};

module.exports = { CONFIG };
