const mongoose = require('mongoose');
const saldoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valor: { type: Number, required: true },
    mes: { type: Date, required: true }
});
saldoSchema.index({ userId: 1, mes: 1 }, { unique: true });
module.exports = mongoose.model('Saldo', saldoSchema);
