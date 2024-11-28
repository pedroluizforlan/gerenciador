const Saldo = require('../models/saldo.model');


const criarSaldo = async (req, res) => {
  try {
    const { valor, mes } = req.body;
    const userId = req.userId;

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

// Função para listar saldos do usuário autenticado
const listarSaldos = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado.' });
    }

    const saldos = await Saldo.find({ userId });
    res.status(200).json(saldos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função para editar um saldo existente
const editarSaldo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { valor, mes } = req.body;

    // Atualizar o saldo do usuário para o mês especificado
    const saldoAtualizado = await Saldo.findOneAndUpdate(
      { _id: id, userId },
      { valor, mes },
      { new: true }
    );

    if (!saldoAtualizado) {
      return res.status(404).json({ message: 'Saldo não encontrado ou não autorizado a editar.' });
    }

    res.status(200).json({ message: 'Saldo atualizado com sucesso!', saldo: saldoAtualizado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const saldoPorMes = async (req, res) => {
  try {
    const userId = req.userId;
    const { ano, mes } = req.params;

    if (!userId || !ano || !mes || isNaN(ano) || isNaN(mes)) {
      return res.status(400).json({ message: 'Ano ou mês inválidos.' });
    }


    const inicioMes = new Date(ano, mes - 1, 1);
    const fimMes = new Date(ano, mes, 1);


    const saldo = await Saldo.findOne({
      userId,
      mes: { $gte: inicioMes, $lt: fimMes }
    });

    if (!saldo) {
      return res.status(404).json({ message: 'Saldo não encontrado para o mês especificado.' });
    }

    res.status(200).json(saldo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { criarSaldo, listarSaldos, editarSaldo , saldoPorMes };

