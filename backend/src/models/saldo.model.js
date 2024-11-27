const mongoose = require('mongoose');
const saldoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valor: Number,
    mes: String
});
module.exports = mongoose.model('Saldo', saldoSchema);
