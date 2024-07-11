import mailgun from 'mailgun-js';

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: process.env.MAILGUN_DOMAIN  || '',
});

const sendEmail = (to:any, subject:any, text:string) => {
  const data = {
    from: 'Your Name <your-email@your-domain.com>',
    to,
    subject,
    text,
  };

  return mg.messages().send(data);
};

export default sendEmail;
