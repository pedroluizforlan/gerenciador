const express = require('express');
const {
  criarGasto,
  listarGastos,
  editarGasto,
  excluirGasto,
  totalGastoPorMes,
  contarCategorias
} = require('../controllers/gasto.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/gastos', autenticarUsuario, criarGasto);
router.get('/gastos', autenticarUsuario, listarGastos);
router.put('/gastos/:id', autenticarUsuario, editarGasto);
router.delete('/gastos/:id', autenticarUsuario, excluirGasto);
router.get('/gastos/:ano/:mes', autenticarUsuario, totalGastoPorMes);
router.get('/gastos/categorias', autenticarUsuario, contarCategorias);

module.exports = router;
