const mongoose = require('mongoose');

const ContaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nome: String,
  valor: Number,
  vencimento: Date,
  status: { type: String, enum: ['pago', 'pendente'], default: 'pendente' },
  comprovante: String,
  categoria: String,
  criadaEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conta', ContaSchema);
