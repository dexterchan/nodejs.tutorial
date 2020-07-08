const tar = require("tar");

describe("test tarball", () => {
  it(
    "should tar file",
    async () => {
      const fileName = "/Users/dexter/temp/run.tar.gz";
      const folder = "tests";
      await tar.c(
        {
          gzip: true,
          file: fileName,
        },
        [folder]
      );
      const time = new Date(Date.now());
      console.log(`File Compressed. ${time.toISOString()}`);
    },
    1000 * 1000
  );
});
