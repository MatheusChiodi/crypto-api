const axios = require('axios');
const logger = require('../utils/logger');

const getCoinList = async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    res.json({ available_coins: response.data.map((coin) => coin.id) });
  } catch (error) {
    logger.error('Error fetching coin list:', error);
    res.status(500).json({ error: 'Error fetching coin list.' });
  }
};

const getPrices = async (req, res) => {
  const { coins, baseCurrency } = req.body;
  if (!coins || !Array.isArray(coins) || coins.length === 0) {
    return res
      .status(400)
      .json({ error: 'Provide a valid list of cryptocurrencies.' });
  }

  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: coins.join(','),
          vs_currencies: baseCurrency || 'usd',
          include_24hr_change: 'true',
        },
      }
    );
    res.json({ prices: response.data });
  } catch (error) {
    logger.error('Error fetching prices:', error);
    res.status(500).json({ error: 'Error fetching prices.' });
  }
};

const getCoinHistory = async (req, res) => {
  const { coin } = req.params;
  const { days = 30 } = req.query;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
      {
        params: { vs_currency: 'usd', days: days },
      }
    );
    res.json({ coin, history: response.data.prices });
  } catch (error) {
    logger.error('Error fetching coin history:', error);
    res.status(500).json({ error: 'Error fetching coin history.' });
  }
};

module.exports = { getCoinList, getPrices, getCoinHistory };
