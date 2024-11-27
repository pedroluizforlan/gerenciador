const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha,salt)

        const novoUsuario = new User({ nome, email, senha:senhaHash });
        await novoUsuario.save();
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
        }

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        
        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida.' });
        }

        // Gerar token
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login bem-sucedido!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { criarUsuario, loginUsuario};

