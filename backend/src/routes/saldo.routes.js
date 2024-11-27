const express = require('express');
const { criarSaldo, listarSaldos, editarSaldo } = require('../controllers/saldo.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/saldos', autenticarUsuario, criarSaldo);
router.get('/saldos', autenticarUsuario, listarSaldos);
router.get('/saldos/:id',autenticarUsuario, editarSaldo)

module.exports = router;
