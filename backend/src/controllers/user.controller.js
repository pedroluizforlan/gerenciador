const User = require('../models/user.model');
const criarUsuario = async (req, res) => {
    try {
        const novoUsuario = new User(req.body);
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { criarUsuario };
