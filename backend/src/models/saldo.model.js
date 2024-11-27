const mongoose = require('mongoose');
const saldoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valor: { type: Number, required: true },
    mes: { type: String, required: true, match: /^\d{4}-\d{2}$/ } 
});
saldoSchema.index({ userId: 1, mes: 1 }, { unique: true });
module.exports = mongoose.model('Saldo', saldoSchema);