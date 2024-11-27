const mongoose = require('mongoose');
const gastoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    titulo: String,
    categoria: String,
    data: Date
});
module.exports = mongoose.model('Gasto', gastoSchema);
