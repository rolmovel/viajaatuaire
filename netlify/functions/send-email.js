// netlify/functions/send-email.js
const mailgun = require('mailgun-js');
const axios = require('axios');

exports.handler = async function (event, context) {
  const { from, to, subject, text } = JSON.parse(event.body);
  console.log(subject);


  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY, url: 'https://api.eu.mailgun.net'});

  try {
    const formData = new FormData()
    formData.append('from', from)
    formData.append('to', to)
    formData.append('subject', subject)
    formData.append('html', '')
    formData.append('text', text)

    axios({
        method: 'post',
        url: `https://api.eu.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`,
        auth: {
                username: 'api',
                password: process.env.MAILGUN_API_KEY
            },
        data: formData
        })
        .then(response => {
            console.log('[MAILGUN] Successfully: ', response)
        })
        .catch(error => {
            console.error('[MAILGUN] Error: ', error)
        })

      return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Correo enviado con éxito' }),
      };
  } catch (error) {
  console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al enviar el correo', details: error.message }),
    };
  }
};
