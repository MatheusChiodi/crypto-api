const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');
const alertController = require('../controllers/alertController');
const favoriteController = require('../controllers/favoriteController');
const compareController = require('../controllers/compareController');

router.get('/coins', coinController.getCoinList);
router.post('/coins/prices', coinController.getPrices);
router.get('/coins/history/:coin', coinController.getCoinHistory);
router.post('/alerts', alertController.createAlert);
router.post('/favorites', favoriteController.updateFavorites);
router.get('/favorites/:user_id', favoriteController.getFavorites);
router.post("/compare", compareController.compareCoins);

module.exports = router;
