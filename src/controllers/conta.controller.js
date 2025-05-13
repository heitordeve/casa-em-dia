const Conta = require('../models/Conta');

exports.criar = async (req, res) => {
  try {
    const conta = new Conta({ ...req.body, userId: req.userId });
    await conta.save();
    res.status(201).json(conta);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar conta', detalhes: err });
  }
};

exports.listar = async (req, res) => {
  const contas = await Conta.find({ userId: req.userId }).sort({ vencimento: 1 });
  res.json(contas);
};

exports.obter = async (req, res) => {
  const conta = await Conta.findOne({ _id: req.params.id, userId: req.userId });
  if (!conta) return res.status(404).json({ erro: 'Conta não encontrada' });
  res.json(conta);
};

exports.atualizar = async (req, res) => {
  const conta = await Conta.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(conta);
};

exports.deletar = async (req, res) => {
  await Conta.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ mensagem: 'Conta removida' });
};

exports.uploadComprovante = async (req, res) => {
  if (!req.file) return res.status(400).json({ erro: 'Arquivo não enviado' });

  const conta = await Conta.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { comprovante: req.file.filename },
    { new: true }
  );

  res.json({ mensagem: 'Comprovante salvo', comprovante: conta.comprovante });
};
