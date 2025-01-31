const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

let favorites = {};
let alerts = [];

const getCoinList = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching coin list:', error);
    return null;
  }
};

const getPrices = async (coins, baseCurrency = 'usd') => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: coins.join(','),
          vs_currencies: baseCurrency,
          include_24hr_change: 'true',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
};

const getDollarExchangeRate = async () => {
  try {
    const response = await axios.get(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL'
    );
    return parseFloat(response.data.USDBRL.bid);
  } catch (error) {
    console.error('Error fetching dollar exchange rate:', error);
    return null;
  }
};

app.get('/', async (req, res) => {
  const coinList = await getCoinList();
  if (!coinList)
    return res.status(500).json({ error: 'Error fetching coin list.' });
  res.json({ available_coins: coinList.map((coin) => coin.id) });
});

app.post('/prices', async (req, res) => {
  const { coins, baseCurrency } = req.body;
  if (!coins || !Array.isArray(coins) || coins.length === 0) {
    return res
      .status(400)
      .json({ error: 'Provide a valid list of cryptocurrencies.' });
  }

  const prices = await getPrices(coins, baseCurrency || 'usd');
  if (!prices) return res.status(500).json({ error: 'Error fetching prices.' });

  res.json({ prices });
});

app.get('/history/:coin', async (req, res) => {
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
    res.status(500).json({ error: 'Error fetching coin history.' });
  }
});

app.post('/alert', (req, res) => {
  const { coin, target_price, email } = req.body;
  alerts.push({ coin, target_price, email });
  res.json({ status: 'Alert created', coin, target_price });
});

app.post('/favorites', (req, res) => {
  const { user_id, coins } = req.body;
  favorites[user_id] = coins;
  res.json({ status: 'Favorites updated', favorites: coins });
});

app.get('/favorites/:user_id', (req, res) => {
  const { user_id } = req.params;
  res.json({ user_id, favorites: favorites[user_id] || [] });
});

app.post('/compare', async (req, res) => {
  const { coins } = req.body;
  if (!coins || !Array.isArray(coins) || coins.length < 2) {
    return res
      .status(400)
      .json({ error: 'Provide at least two cryptocurrencies for comparison.' });
  }
  const prices = await getPrices(coins);
  res.json({ comparison: prices });
});

app.get('/exchange-rate', async (req, res) => {
  const dollarExchangeRate = await getDollarExchangeRate();
  res.json({ dollar_exchange_rate: dollarExchangeRate });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
