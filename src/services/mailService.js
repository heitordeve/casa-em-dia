const transporter = require('../config/mail');

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
