const express = require('express');
const router = express.Router();
const { criarUsuario, loginUsuario } = require('../controllers/user.controller');
router.post('/usuarios', criarUsuario);
router.post('/login', loginUsuario);
module.exports = router;
