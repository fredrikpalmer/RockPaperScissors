const constants = require("./constants");

module.exports = {
  resolve: function (type) {
    switch (type) {
      case constants.events.server.gameJoin:
        return require("./handlers/join");
      case constants.events.server.playerReady:
        return require("./handlers/ready");
      case constants.events.server.playHand:
        return require("./handlers/play");
      default:
        throw new Error("Argument unknown");
    }
  },
};
