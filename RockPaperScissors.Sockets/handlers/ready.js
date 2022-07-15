const constants = require("../constants");
const getGame = require("../utils/getGame");
const WebSocket = require("ws");

module.exports = {
  handle: function (ws, games, msg) {
    game = getGame(games, msg.id);

    game.players.forEach(function each(player) {
      if (player.id === msg.playerId) {
        player.ready = true;
      }

      if (player.client.readyState === WebSocket.OPEN) {
        player.client.send(
          JSON.stringify({
            type: constants.events.client.playerReady,
            playerId: msg.playerId,
            ready: true,
          })
        );
      }
    });

    if (game.players.length === 2 && game.players.every((p) => p.ready)) {
      game.players.forEach(function each(player) {
        if (player.client.readyState === WebSocket.OPEN) {
          player.client.send(
            JSON.stringify({
              type: constants.events.client.gameStart,
            })
          );
        }
      });
    }
  },
};
