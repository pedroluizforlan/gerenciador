const express = require('express');
const { criarSaldo } = require('../controllers/saldo.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/saldos', autenticarUsuario, criarSaldo);

module.exports = router;
