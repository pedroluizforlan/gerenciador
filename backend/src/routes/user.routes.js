const express = require('express');
const router = express.Router();
const { criarUsuario } = require('../controllers/user.controller');
router.post('/usuarios', criarUsuario);
module.exports = router;
