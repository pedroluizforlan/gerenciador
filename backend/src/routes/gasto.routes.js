const express = require('express');
const { criarGasto, listarGastos, editarGasto, excluirGasto } = require('../controllers/gasto.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/gastos', autenticarUsuario, criarGasto);
router.get('/gastos', autenticarUsuario, listarGastos);
router.put('/gastos/:id', autenticarUsuario, editarGasto);
router.delete('/gastos/:id', autenticarUsuario, excluirGasto);

module.exports = router;