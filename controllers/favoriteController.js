const logger = require('../utils/logger');

let favorites = {};

const updateFavorites = (req, res) => {
  const { user_id, coins } = req.body;
  favorites[user_id] = coins;
  logger.info(`Favorites updated for user ${user_id}`);
  res.json({ status: 'Favorites updated', favorites: coins });
};

const getFavorites = (req, res) => {
  const { user_id } = req.params;
  const userFavorites = favorites[user_id] || [];
  logger.info(`Retrieved favorites for user ${user_id}`);
  res.json({ user_id, favorites: userFavorites });
};

module.exports = { updateFavorites, getFavorites };
