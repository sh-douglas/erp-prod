const nodemailer = require("nodemailer");

async function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: process.env.MAIL_PORT === "465",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}

async function sendWelcomeEmail(name, email, employeeCode) {
  const subject = "Bem-vindo(a) ao Prometheus ERP";

  const text = `
    Olá, ${name}.

    Sua conta no Prometheus ERP foi criada com sucesso.

    Seu código de acesso é: ${employeeCode}

    Use esse código junto com sua senha para acessar o sistema.

    Se você não realizou este cadastro, ignore este e-mail.
  `;

  await sendMail(email, subject, text);
}

module.exports = {
  sendMail,
  sendWelcomeEmail,
};
