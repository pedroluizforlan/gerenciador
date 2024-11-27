const express = require('express');
const { criarGasto } = require('../controllers/gasto.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/gastos', autenticarUsuario, criarGasto);

module.exports = router;