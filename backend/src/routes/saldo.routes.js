const express = require('express');
const { criarSaldo, listarSaldos, editarSaldo ,saldoPorMes} = require('../controllers/saldo.controller');
const autenticarUsuario = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/saldos', autenticarUsuario, criarSaldo);
router.get('/saldos', autenticarUsuario, listarSaldos);
router.put('/saldos/:id',autenticarUsuario, editarSaldo);
router.get('/saldos/:ano/:mes', autenticarUsuario, saldoPorMes);



module.exports = router;
