const Gasto = require('../models/gasto.model');
const mongoose = require('mongoose');

const criarGasto = async (req, res) => {
  try {
    const { userId, valor, titulo, categoria, data } = req.body;


    if (!userId || !titulo || !categoria || !data || !valor) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
    }

    const novoGasto = new Gasto({ userId, valor ,  titulo, categoria, data });
    await novoGasto.save();
    res.status(201).json({ message: 'Gasto registrado com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarGastos = async (req, res) => {
  try {
    const userId = req.userId; // ID do usuário autenticado
    const gastos = await Gasto.find({ userId: userId });
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

const totalGastoPorMes = async (req, res) => {
  try {
    const userId = req.userId;
    const { ano, mes } = req.params;


    if (!ano || !mes || isNaN(ano) || isNaN(mes)) {
      return res.status(400).json({ error: 'Ano e mês inválidos.' });
    }

    const inicioMes = new Date(ano, mes - 1, 1);
    const fimMes = new Date(ano, mes, 1);

    const total = await Gasto.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          data: {
            $gte: inicioMes,
            $lt: fimMes
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$valor' }
        }
      }
    ]);


    if (total.length === 0) {
      return res.status(200).json({ total: 0 });
    }

    res.status(200).json({ total: total[0].total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const contarCategorias = async (req, res) => {
  try {
    const userId = req.userId;

    const categorias = await Gasto.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $group: {
          _id: '$categoria',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { criarGasto, listarGastos, editarGasto, excluirGasto, totalGastoPorMes, contarCategorias};

