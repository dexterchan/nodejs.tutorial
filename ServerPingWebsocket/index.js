require("module-alias/register");
const app = require("express")();
require("./startup/logging")();

const AWSXRay = require("aws-xray-sdk");
app.use(AWSXRay.express.openSegment("mktdataws3"));

const [http, io] = require("./startup/route")(app);

app.use(AWSXRay.express.closeSegment());

const port = process.env.PORT || 3000;

const server = http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
