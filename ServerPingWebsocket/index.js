require("module-alias/register");
const app = require("express")();
require("./startup/logging")();

const [http, io] = require("./startup/route")(app);

const port = process.env.PORT || 3000;

const server = http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
