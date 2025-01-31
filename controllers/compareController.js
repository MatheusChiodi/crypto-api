const axios = require('axios');
const logger = require('../utils/logger');

const compareCoins = async (req, res) => {
  const { coins } = req.body;

  if (!coins || !Array.isArray(coins) || coins.length < 2) {
    return res
      .status(400)
      .json({ error: 'Envie ao menos duas criptomoedas para comparação.' });
  }

  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: coins.join(','),
          vs_currencies: 'usd',
          include_24hr_change: 'true',
        },
      }
    );

    logger.info(`Comparação realizada entre: ${coins.join(', ')}`);
    res.json({ comparacao: response.data });
  } catch (error) {
    logger.error('Erro ao obter preços para comparação:', error);
    res.status(500).json({ error: 'Erro ao obter preços para comparação.' });
  }
};

module.exports = { compareCoins };
