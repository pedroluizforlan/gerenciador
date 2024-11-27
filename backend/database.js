require('dotenv').config();
const mongoose = require('mongoose');

// Função para conectar ao banco de dados
const connectDB = () => {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
        process.exit(1); // Termina a aplicação se a URI estiver faltando
    }

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Conectado ao banco de dados'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
};

// Exportando a função para ser usada em outros arquivos
module.exports = connectDB;