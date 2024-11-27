const express = require('express');
const { criarSaldo } = require('../controllers/saldo.controller');
const router = express.Router();

router.post('/saldos', criarSaldo);

module.exports = router;
