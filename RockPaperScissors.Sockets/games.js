const crypto = require("crypto");

const factory = (function () {
  function Game(id) {
    this.id = id;

    this.players = [];
  }

  Game.prototype.join = function (player) {
    this.players.push(player);
  };

  function GameCollection() {
    this.queue = [];

    this.games = new Map();
  }

  GameCollection.prototype.getOrCreate = function () {
    let gameId = this.queue.shift();
    if (gameId === undefined) {
      gameId = crypto.randomBytes(3).toString("hex");
      this.queue.push(gameId);
    }

    let game = this.games.get(gameId);
    if (game === undefined) {
      game = new Game(gameId);
      this.games.set(gameId, game);
    }

    return game;
  };

  GameCollection.prototype.get = function (gameId) {
    return this.games.get(gameId);
  };

  let instance;

  return {
    getInstance: function () {
      if (!instance) {
        instance = new GameCollection();
      }
      return instance;
    },
  };
})();

module.exports = factory.getInstance();
