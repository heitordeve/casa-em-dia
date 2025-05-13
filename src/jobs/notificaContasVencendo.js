const cron = require('node-cron');
const Conta = require('../models/Conta');
const User = require('../models/User'); 
const { sendEmail } = require('../services/mailService');
const moment = require('moment');
require('dotenv').config();

cron.schedule('0 8 * * *', async () => {
  console.log('🔔 Verificando contas prestes a vencer...');

  const diasAntes = parseInt(process.env.AVISO_DIAS_ANTES || '3');
  const horarioCron = process.env.AVISO_HORARIO || '0 8 * * *';

  const contas = await Conta.find({
    vencimento: {
      $gte: horarioCron.toDate(),
      $lt: moment(horarioCron).endOf('day').toDate()
    }
  });

  for (const conta of contas) {
    const user = await User.findById(conta.userId);
    if (!user || !user.email) continue;

    const texto = `
Olá ${user.nome || ''},

Sua conta "${conta.nome}" está prevista para vencer em ${diasAntes} dias (em ${moment(conta.vencimento).format('DD/MM/YYYY')}).

Valor: R$ ${conta.valor.toFixed(2)}

Se já pagou, desconsidere este aviso.

Atenciosamente,
Sistema de Contas
`;

    try {
      await sendEmail(user.email, '📅 Conta próxima do vencimento', texto);

      // Marcar a conta como avisada
      conta.avisoEnviado = true;
      await conta.save();

      console.log(`📧 E-mail enviado para ${user.email} sobre a conta ${conta.nome}`);
    } catch (error) {
      console.error(`❌ Erro ao enviar e-mail para ${user.email}:`, error);
    }
  }
});
