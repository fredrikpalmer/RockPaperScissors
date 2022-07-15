module.exports = function (games, id) {
  try {
    const game = games.get(id);

    if (!game) throw new Error("Game not found");

    return game;
  } catch (error) {
    console.error(error);
    return null;
  }
};
