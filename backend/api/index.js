const express = require('express');
const cors = require('cors');
const connectDB = require('../database');  // Aqui está a importação da função connectDB
const userRoutes = require('../src/routes/user.routes');
const saldoRoutes = require('../src/routes/saldo.routes');
const gastoRoutes = require('../src/routes/gasto.routes');

const app = express();

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', userRoutes);
app.use('/api', saldoRoutes);
app.use('/api', gastoRoutes);

// Vercel exige que você exporte a aplicação Express como uma função serverless
module.exports = app;
