const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = new User({ nome, email, senha });
    await usuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar usuário', detalhes: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario || !(await usuario.validarSenha(senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, usuario: { nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};
