const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  const [, tokenJwt] = token.split(' ');

  jwt.verify(tokenJwt, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ erro: 'Token inválido' });

    req.userId = decoded.id;
    next();
  });
};
