const express = require('express');
const cors = require('cors');
const connectDB = require('./database');  // Aqui está a importação da função connectDB
const userRoutes = require('./src/routes/user.routes');
const saldoRoutes = require('./src/routes/saldo.routes');
const gastoRoutes = require('./src/routes/gasto.routes')
const app = express();

// Conecta ao banco de dados
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', saldoRoutes);
app.use('/api', gastoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));