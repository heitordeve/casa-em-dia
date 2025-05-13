const mongoose = require('mongoose');

const ContaSchema = new mongoose.Schema({
  nome: String,
  valor: Number,
  vencimento: Date,
  comprovante: String,
  userId: mongoose.Schema.Types.ObjectId,
  avisoEnviado: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Conta', ContaSchema);
