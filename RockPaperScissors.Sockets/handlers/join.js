const constants = require("../constants");
const WebSocket = require("ws");

module.exports = {
  handle: function (ws, games, msg) {
    const game = games.getOrCreate();
    const newPlayer = {
      id: game.players.length + 1,
      name: msg.name,
      ready: false,
      handPlayed: false,
      client: ws,
    };

    game.join(newPlayer);

    ws.send(
      JSON.stringify({
        type: constants.events.client.playerInfo,
        playerId: newPlayer.id,
        name: newPlayer.name,
      })
    );

    game.players.forEach(function each(player) {
      if (player.client.readyState === WebSocket.OPEN) {
        player.client.send(
          JSON.stringify({
            type: constants.events.client.gameJoined,
            id: game.id,
            players: game.players.map((p) => ({
              id: p.id,
              name: p.name,
              ready: p.ready,
              handPlayed: p.handPlayed,
            })),
          })
        );
      }
    });
  },
};
