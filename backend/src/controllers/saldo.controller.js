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

const listarSaldos = async (req, res) => {
    try {
        const userId = req.userId; // ID do usuário autenticado
        const saldos = await Saldo.find({ idUsuario: userId });
        res.status(200).json(saldos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editarSaldo = async (req, res) => {
    try {
        const { id } = req.params; // ID do saldo que será editado
        const userId = req.userId; // ID do usuário autenticado
        const { valor, mes } = req.body;

        // Atualizar o saldo do usuário para o mês especificado
        const saldoAtualizado = await Saldo.findOneAndUpdate(
            { _id: id, idUsuario: userId }, // Verifica o ID do saldo e do usuário
            { valor, mes }, // Dados que serão atualizados
            { new: true } // Retorna o saldo atualizado
        );

        if (!saldoAtualizado) {
            return res.status(404).json({ message: 'Saldo não encontrado.' });
        }

        res.status(200).json({ message: 'Saldo atualizado com sucesso!', saldo: saldoAtualizado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { criarSaldo, listarSaldos, editarSaldo };