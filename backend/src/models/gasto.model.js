const mongoose = require('mongoose');
const gastoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valor: { type: Number, required: true },
    titulo: { type: String, required: true },
    categoria: { type: String, required: true },
    data: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Gasto', gastoSchema);
