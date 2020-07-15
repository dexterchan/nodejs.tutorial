const tar = require("tar");
const fs = require("fs");
describe("test tarball", () => {
  it(
    "should tar file",
    async () => {
      const fileName = "/Users/dexter/temp/tests.tar.gz";
      const folder = "tests";
      if (fs.existsSync(folder)) {
        await tar.c(
          {
            gzip: true,
            file: fileName,
          },
          [folder]
        );
        const time = new Date(Date.now());
        console.log(`File Compressed. ${time.toISOString()}`);
      } else {
        console.log(`No folder to compress ${folder}`);
      }
    },
    1000 * 1000
  );
});
