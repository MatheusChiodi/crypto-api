const logger = require('../utils/logger');

let alerts = [];

const createAlert = (req, res) => {
  const { coin, target_price, email } = req.body;
  alerts.push({ coin, target_price, email });
  logger.info(`Alert created for ${coin} at ${target_price}`);
  res.json({ status: 'Alert created', coin, target_price });
};

module.exports = { createAlert };
