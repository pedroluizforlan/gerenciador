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

const listarGastos = async (req, res) => {
    try {
        const userId = req.userId; // ID do usuário autenticado
        const gastos = await Gasto.find({ idUsuario: userId });
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editarGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { titulo, categoria, data } = req.body;

        const gastoAtualizado = await Gasto.findOneAndUpdate(
            { _id: id, idUsuario: userId },
            { titulo, categoria, data },
            { new: true }
        );

        if (!gastoAtualizado) {
            return res.status(404).json({ message: 'Gasto não encontrado.' });
        }

        res.status(200).json(gastoAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const excluirGasto = async (req,res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const gastoRemovido = await Gasto.findOneAndDelete({ _id: id, idUsuario: userId });

        if (!gastoRemovido) {
            return res.status(404).json({ message: 'Gasto não encontrado.' });
        }

        res.status(200).json({ message: 'Gasto removido com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { criarGasto, listarGastos, editarGasto, excluirGasto};

