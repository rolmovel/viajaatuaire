    // pages/api/send-email.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    try {
      const response = await fetch(`https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          from: 'Mailgun Sandbox <postmaster@YOUR_DOMAIN_NAME>',
          to: to,
          subject: subject,
          text: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data.message });
      }

      res.status(200).json({ message: 'Email enviado exitosamente!', data });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar el correo', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}

