const ts = require("tail-stream");

const tailLogService = (fileName, callback) => {
  const tstream = ts.createReadStream(fileName, {
    beginAt: 0,
    onMove: "follow",
    detectTruncate: true,
    onTruncate: "end",
    endOnError: false,
  });

  tstream.on("data", function (data) {
    console.log("got data: " + data);
    callback(data);
  });

  tstream.on("end", function () {
    console.log("ended");
  });

  tstream.on("error", function (err) {
    console.log("error: " + err);
  });
};

module.exports = {
  tailLogService,
};
