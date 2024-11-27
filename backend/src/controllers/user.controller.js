const User = require('../models/user.model');

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        const novoUsuario = new User({ nome, email, senha });
        await novoUsuario.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { criarUsuario };

