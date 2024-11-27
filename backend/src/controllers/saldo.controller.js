const Saldo = require('../models/saldo.model');

const criarSaldo = async (req, res) => {
    try {
        const { userId, valor, mes } = req.body;
        if (!userId || !valor || !mes) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        const novoSaldo = new Saldo({ userId, valor, mes });
        await novoSaldo.save();
        res.status(201).json({ message: 'Saldo registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { criarSaldo };