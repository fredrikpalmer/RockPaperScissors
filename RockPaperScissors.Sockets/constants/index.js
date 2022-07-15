const server = require("./serverEvents");
const client = require("./clientEvents");

module.exports = {
  events: {
    server: server,
    client: client,
  },
};
