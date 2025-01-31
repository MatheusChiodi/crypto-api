const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

let favoritos = {};
let alertas = [];

const obterListaMoedas = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/list'
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao obter lista de moedas:', error);
    return null;
  }
};

const obterPrecos = async (moedas, moedaBase = 'usd') => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: moedas.join(','),
          vs_currencies: moedaBase,
          include_24hr_change: 'true',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao obter preços:', error);
    return null;
  }
};

const obterCotacaoDolar = async () => {
  try {
    const response = await axios.get(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL'
    );
    return parseFloat(response.data.USDBRL.bid);
  } catch (error) {
    console.error('Erro ao obter cotação do dólar:', error);
    return null;
  }
};

app.get('/', async (req, res) => {
  const listaMoedas = await obterListaMoedas();
  if (!listaMoedas)
    return res.status(500).json({ error: 'Erro ao obter lista de moedas.' });
  res.json({ moedas_disponiveis: listaMoedas.map((moeda) => moeda.id) });
});

app.post('/precos', async (req, res) => {
  const { moedas, moedaBase } = req.body;
  if (!moedas || !Array.isArray(moedas) || moedas.length === 0) {
    return res
      .status(400)
      .json({ error: 'Envie uma lista de criptomoedas válida.' });
  }

  const precos = await obterPrecos(moedas, moedaBase || 'usd');
  if (!precos) return res.status(500).json({ error: 'Erro ao obter preços.' });

  res.json({ precos });
});

app.get('/historico/:moeda', async (req, res) => {
  const { moeda } = req.params;
  const { dias = 30 } = req.query;
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${moeda}/market_chart`,
      {
        params: { vs_currency: 'usd', days: dias },
      }
    );
    res.json({ moeda, historico: response.data.prices });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter histórico da moeda.' });
  }
});

app.post('/alerta', (req, res) => {
  const { moeda, preco_desejado, email } = req.body;
  alertas.push({ moeda, preco_desejado, email });
  res.json({ status: 'Alerta criado', moeda, preco_desejado });
});

app.post('/favoritos', (req, res) => {
  const { usuario_id, moedas } = req.body;
  favoritos[usuario_id] = moedas;
  res.json({ status: 'Favoritos atualizados', favoritos: moedas });
});

app.get('/favoritos/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  res.json({ usuario_id, favoritos: favoritos[usuario_id] || [] });
});

app.post('/comparar', async (req, res) => {
  const { moedas } = req.body;
  if (!moedas || !Array.isArray(moedas) || moedas.length < 2) {
    return res
      .status(400)
      .json({ error: 'Envie ao menos duas criptomoedas para comparação.' });
  }
  const precos = await obterPrecos(moedas);
  res.json({ comparacao: precos });
});

app.get('/cotacao', async (req, res) => {
  const cotacaoDolar = await obterCotacaoDolar();
  res.json({ cotacao_dolar: cotacaoDolar });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
