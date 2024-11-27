const express = require('express');
const { criarGasto } = require('../controllers/gasto.controller');
const router = express.Router();

router.post('/gastos', criarGasto);

module.exports = router;