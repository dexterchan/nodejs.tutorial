const request = require("supertest");
const logger = require("@logger");
let server;
let hostname;
let port;
const connectMktDataAsync = async (hostname, port) =>
  new Promise(async (resolve, reject) => {});

const getExec = async (url) => {
  return await request(server).get(url).send();
};

describe("//blp/mktdata", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  it("should return time", async () => {
    const res = await getExec("/api/ping/time");
    console.log(res.text);
    expect(res.status).toBe(200);
  });
  it("should connect market data ", async () => {});

  afterEach(() => {
    server.close();
  });
});
