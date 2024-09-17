// netlify/functions/send-email.js
const mailgun = require('mailgun-js');

exports.handler = async function (event, context) {
  const { to, subject, text } = JSON.parse(event.body);

  const DOMAIN = process.env.MAILGUN_DOMAIN; // Tu dominio de Mailgun
  const API_KEY = process.env.MAILGUN_API_KEY; // Tu API Key de Mailgun

  const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

  const data = {
    from: 'TuNombre <tu-email@tudominio.com>',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const body = await mg.messages().send(data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado correctamente', body }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el correo', details: error.message }),
    };
  }
};
