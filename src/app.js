const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const contaRoutes = require('./routes/conta.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

app.use('/auth', authRoutes);
app.use('/contas', contaRoutes);

module.exports = app;
