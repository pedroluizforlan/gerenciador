const Gasto = require('../models/gasto.model');

const criarGasto = async (req, res) => {
    try {
        const { userId, titulo, categoria, data } = req.body;

        if (!userId || !titulo || !categoria) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        const novoGasto = new Gasto({ userId, titulo, categoria, data });
        await novoGasto.save();
        res.status(201).json({ message: 'Gasto registrado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { criarGasto };

