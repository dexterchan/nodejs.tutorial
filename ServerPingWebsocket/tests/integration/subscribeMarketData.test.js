const request = require("supertest");
const logger = require("@logger");
const { sleep } = require("@utils/basic");
let server;
let hostname;
let port;
const WAIT_MS = 10 * 1000;

const connectMktDataAsync = async (hostname, port) =>
  new Promise(async (resolve, reject) => {
    const url = `http://${hostname}:${port}`;
    const vssocket = require("socket.io-client")(url, {
      transportOptions: {
        polling: {
          extraHeaders: {
            user: "abc",
          },
        },
      },
    });
    vssocket.on("connect", () => {
      resolve(vssocket);
    });
  });

const getExec = async (url) => {
  return await request(server).get(url).send();
};

describe("//blp/mktdata", () => {
  beforeAll(() => {
    server = require("../../index");
    hostname = "localhost";
    port = 3000;
  });
  /*
  it("should return time", async () => {
    const res = await getExec("/api/ping/time");
    console.log(res.text);
    expect(res.status).toBe(200);
  });*/
  it(
    "should connect market data ",
    async () => {
      const vssocket = await connectMktDataAsync(hostname, port);
      expect(vssocket).not.toBeNull();
      const mktRequest = {
        mktdatacode: "AAPL 150117C00600000 EQUITY",
        fields: ["BID", "ASK"],
      };
      vssocket.emit("//blp/mktdata", mktRequest);
      let count = 0;
      vssocket.on("//blp/mktdata/response", (mktdata) => {
        console.log(mktdata);
        if (typeof mktdata == "string") mktdata = JSON.parse(mktdata);
        count++;
        expect(mktdata).toHaveProperty("Bid");
        expect(mktdata).toHaveProperty("Ask");
        expect(mktdata["Bid"]).toBeGreaterThanOrEqual(1);
        expect(mktdata["Bid"]).toBeLessThan(10);
        expect(mktdata["Ask"]).toBeGreaterThanOrEqual(1);
        expect(mktdata["Ask"]).toBeLessThan(10);
      });

      await sleep(WAIT_MS);
      expect(count).toBeGreaterThan(0);
      vssocket.close();
      await sleep(WAIT_MS);
    },
    WAIT_MS * 10
  );

  afterAll(() => {
    server.close();
  });
});
